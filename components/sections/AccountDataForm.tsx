"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Modal,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "dayjs/locale/pl";
import LabelTextInput from "../form/LabelTextInput";
import LabelImageInput from "../form/LabelImageInput";
import LabelSelectInput from "../form/LabelSelectInput";
import LabelAutocompleteInput from "../form/LabelAutocompleteInput";
import LabelColorInput from "../form/LabelColorInput";
import { getSignedURL } from "@/helpers/getSignedUrl";
import { computeSHA256 } from "@/helpers/computeSHA256";
import { signOut } from "next-auth/react";
import ApiResponseAlert, {
    ApiResponse,
} from "@/components/alerts/ApiResponseAlert";
import {
    accountDataValidation,
    AccountDataType,
} from "@/validation/common/accountDataValidation";
import {
    changePasswordValidation,
    ChangePasswordType,
} from "@/validation/common/changePasswordValidation";

interface ISport {
    id: number;
    name: string;
}

interface ITeam {
    id: number;
    name: string;
}

interface IAccountDataFormProps {
    username: string;
    profileImageId: number;
    profileImageName: string;
    profileImageUrl: string;
    backgroundImageId: number;
    backgroundImageName: string;
    backgroundImageUrl: string;
    favouriteSportId: number;
    isFavouriteSportIndividual: boolean;
    favouriteTeamId: number;
    favouriteTeamName: string;
    primaryColor: string;
    secondaryColor: string;
    sportsList: ISport[];
}

const AccountDataForm: React.FC<IAccountDataFormProps> = ({
    username,
    profileImageId,
    profileImageName,
    profileImageUrl,
    backgroundImageId,
    backgroundImageName,
    backgroundImageUrl,
    favouriteSportId,
    isFavouriteSportIndividual,
    favouriteTeamId,
    favouriteTeamName,
    primaryColor,
    secondaryColor,
    sportsList,
}) => {
    const router = useRouter();
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isApiResponseVisible, setIsApiResponseVisible] = useState(false);

    const {
        register: accountDataRegister,
        control: accountDataControl,
        handleSubmit: handleSubmitAccountData,
        formState: { errors: accountDataFormErrors },
    } = useForm<AccountDataType>({
        resolver: zodResolver(accountDataValidation),
        defaultValues: {
            username,
            favouriteSport: favouriteSportId,
            favouriteTeam: favouriteTeamId,
            primaryColor,
            secondaryColor,
        },
    });

    const {
        register: changePasswordRegister,
        control: changePasswordControl,
        handleSubmit: handleSubmitChangePassword,
        reset: resetChangePasswordForm,
        formState: { errors: changePasswordFormErrors },
    } = useForm<ChangePasswordType>({
        resolver: zodResolver(changePasswordValidation),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const [isLoadingAccountDataForm, setIsLoadingAccountDataForm] =
        useState<boolean>(false);
    const [isLoadingChangePasswordForm, setIsLoadingChangePasswordForm] =
        useState<boolean>(false);
    const [isLoadingDeleteAccountForm, setIsLoadingDeleteAccountForm] =
        useState<boolean>(false);
    const [selectedFiles, setSelectedFiles] = useState<{
        [key: string]: File | null;
    }>({
        profileImage: null,
        backgroundImage: null,
    });
    const [isLoadingTeams, setIsLoadingTeams] = useState<boolean>(false);
    const [defaultTeamId, setDefaultTeamId] = useState<number>(
        favouriteTeamId ? favouriteTeamId : 0
    );
    const [teamInput, setTeamInput] = useState<string>(
        favouriteTeamName ? favouriteTeamName : ""
    );
    const [teamsList, setTeamsList] = useState<ITeam[]>([]);
    const [openChangePasswordModal, setOpenChangePasswordModal] =
        useState<boolean>(false);
    const [openDeleteAccountModal, setOpenDeleteAccountModal] =
        useState<boolean>(false);

    useEffect(() => {
        setIsLoadingTeams(true);

        const fetchData = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/get-teams-by-input`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(teamInput),
                }
            );

            const result = await response.json();

            if (result.data) setTeamsList(result.data.teams);
            else setTeamsList([]);

            setIsLoadingTeams(false);
        };

        fetchData();
    }, [teamInput]);

    const handleChangePasswordModal = (state: boolean) => {
        if (isLoadingAccountDataForm) return;
        setOpenChangePasswordModal(state);
        if (state) {
            resetChangePasswordForm({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        }
    };

    const handleDeleteAccountModal = (state: boolean) => {
        if (isLoadingAccountDataForm) return;
        setOpenDeleteAccountModal(state);
    };

    const handleFileChange = (file: File, inputId: string) => {
        setSelectedFiles((prev) => ({ ...prev, [inputId]: file }));
    };

    const handleSubmitAccountDataForm = async (data: AccountDataType) => {
        setIsLoadingAccountDataForm(true);

        let profileImage = {
            id: profileImageId,
            name: profileImageName,
            url: profileImageUrl,
            newUrl: "",
        };

        let backgroundImage = {
            id: backgroundImageId,
            name: backgroundImageName,
            url: backgroundImageUrl,
            newUrl: "",
        };

        for (const [inputId, file] of Object.entries(selectedFiles)) {
            if (!file) continue;

            const checksum = await computeSHA256(file);
            const signedURLResult = await getSignedURL(
                file.type,
                file.size,
                checksum
            );

            if (signedURLResult.failure) {
                console.error(signedURLResult.failure);
                return;
            }

            const name = signedURLResult.success?.name;
            const signedUrl = signedURLResult.success?.url;

            if (signedUrl) {
                await fetch(signedUrl, {
                    method: "PUT",
                    headers: { "Content-Type": file.type },
                    body: file,
                });

                const newUrl = signedUrl.split("?")[0];

                if (name && newUrl) {
                    if (inputId === "profileImage") {
                        profileImage = {
                            id: profileImageId,
                            name,
                            url: profileImage.url,
                            newUrl,
                        };
                    } else if (inputId === "backgroundImage") {
                        backgroundImage = {
                            id: backgroundImageId,
                            name,
                            url: backgroundImage.url,
                            newUrl,
                        };
                    }
                }
            }
        }

        const {
            username,
            favouriteSport,
            favouriteTeam,
            primaryColor,
            secondaryColor,
        } = data;

        const body = {
            username,
            profileImage,
            backgroundImage,
            favouriteSport,
            favouriteTeam,
            primaryColor,
            secondaryColor,
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/update-account-data`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        const result = await response.json();

        setApiResponse(result);
        setIsApiResponseVisible(true);
        setIsLoadingAccountDataForm(false);

        if (profileImage.newUrl || backgroundImage.newUrl) {
            router.refresh();
        }
    };

    const handleSubmitChangePasswordForm = async (data: ChangePasswordType) => {
        setIsLoadingChangePasswordForm(true);

        const { oldPassword, newPassword, confirmPassword } = data;

        const body = {
            oldPassword,
            newPassword,
            confirmPassword,
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/change-password`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        const result = await response.json();

        setApiResponse(result);
        setIsApiResponseVisible(true);
        setIsLoadingChangePasswordForm(false);

        if (result.success) {
            resetChangePasswordForm({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            setOpenChangePasswordModal(false);
        }
    };

    const handleSubmitDeleteAccountForm = async () => {
        setIsLoadingDeleteAccountForm(true);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/delete-account`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }
        );

        const result = await response.json();

        setApiResponse(result);
        setIsApiResponseVisible(true);
        setIsLoadingDeleteAccountForm(false);

        if (result.success) {
            signOut();
        }
    };

    return (
        <>
            <Box sx={{ p: 2 }}>
                <Box
                    sx={{
                        display: { md: "flex" },
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h5" component="h2">
                        Dane konta
                    </Typography>
                    <Box sx={{ mt: { xs: 1, md: 0 } }}>
                        <LoadingButton
                            type="button"
                            variant="outlined"
                            disabled={isLoadingAccountDataForm}
                            onClick={() => handleChangePasswordModal(true)}
                        >
                            Zmień hasło
                        </LoadingButton>
                        <LoadingButton
                            type="button"
                            variant="outlined"
                            disabled={isLoadingAccountDataForm}
                            onClick={() => handleDeleteAccountModal(true)}
                            sx={{ ml: 1 }}
                        >
                            Usuń konto
                        </LoadingButton>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />
                <Box
                    component="form"
                    onSubmit={handleSubmitAccountData(
                        handleSubmitAccountDataForm
                    )}
                >
                    <Box sx={{ display: { xs: "block", md: "flex" } }}>
                        <Box sx={{ flexBasis: "50%" }}>
                            <LabelImageInput
                                label="Zdjęcie profilowe"
                                inputId="profileImage"
                                imageSrc={
                                    profileImageUrl
                                        ? profileImageUrl
                                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                }
                                imageAlt="Zdjęcie profilowe"
                                borderRadius="50%"
                                onFileChange={handleFileChange}
                            />
                        </Box>

                        <Box sx={{ flexBasis: "50%" }}>
                            <LabelImageInput
                                label="Zdjęcie w tle"
                                inputId="backgroundImage"
                                imageSrc={
                                    backgroundImageUrl
                                        ? backgroundImageUrl
                                        : "https://www.amnesty.ie/wp-content/uploads/2016/05/placeholder_2.jpg"
                                }
                                imageAlt="Zdjęcie w tle"
                                imageWidth="100%"
                                onFileChange={handleFileChange}
                            />
                        </Box>
                    </Box>
                    <LabelTextInput
                        label="Nazwa użytkownika"
                        inputId="username"
                        errorText={accountDataFormErrors.username?.message}
                        textFieldProps={{
                            ...accountDataRegister("username"),
                        }}
                    />
                    <Controller
                        name="favouriteSport"
                        control={accountDataControl}
                        render={({ field }) => (
                            <LabelSelectInput
                                label="Ulubiony sport"
                                inputId="favouriteSport"
                                value={field.value?.toString() ?? ""}
                                errorText={
                                    accountDataFormErrors.favouriteSport
                                        ?.message
                                }
                                dataList={sportsList}
                                onChange={(event) => {
                                    field.onChange(Number(event.target.value));
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="favouriteTeam"
                        control={accountDataControl}
                        render={({ field, fieldState }) => (
                            <LabelAutocompleteInput
                                label="Ulubiona drużyna"
                                inputId="favouriteTeam"
                                inputValue={teamInput}
                                defaultId={defaultTeamId}
                                errorText={fieldState.error?.message}
                                dataList={teamsList}
                                isLoadingData={isLoadingTeams}
                                onChange={(event, newValue) => {
                                    field.onChange(newValue ? newValue.id : 0);
                                }}
                                onInputChange={(
                                    event,
                                    newInputValue,
                                    reason
                                ) => {
                                    setTeamInput(newInputValue);
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="primaryColor"
                        control={accountDataControl}
                        render={({ field }) => (
                            <LabelColorInput
                                label="Kolor podstawowy"
                                inputId="primaryColor"
                                inputName="primaryColor"
                                inputValue={field.value ?? "#FFFFFF"}
                                errorText={
                                    accountDataFormErrors.primaryColor?.message
                                }
                                onChange={(color) => {
                                    field.onChange(color);
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="secondaryColor"
                        control={accountDataControl}
                        render={({ field }) => (
                            <LabelColorInput
                                label="Kolor drugorzędny"
                                inputId="secondaryColor"
                                inputName="secondaryColor"
                                inputValue={field.value ?? "#FFFFFF"}
                                errorText={
                                    accountDataFormErrors.secondaryColor
                                        ?.message
                                }
                                onChange={(color) => {
                                    field.onChange(color);
                                }}
                            />
                        )}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                        }}
                    >
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={isLoadingAccountDataForm}
                            sx={{
                                flexBasis: { xs: "100%", md: "auto" },
                            }}
                        >
                            Zapisz
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
            <Modal
                open={openChangePasswordModal}
                onClose={() =>
                    !isLoadingAccountDataForm &&
                    handleChangePasswordModal(false)
                }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                data-size="medium"
            >
                <Card>
                    <CardContent sx={{ m: 3 }}>
                        <>
                            <Typography variant="h6" component="h3">
                                Ustawianie nowego hasła
                            </Typography>
                            <Box
                                component="form"
                                sx={{ mt: 5 }}
                                onSubmit={handleSubmitChangePassword(
                                    handleSubmitChangePasswordForm
                                )}
                            >
                                <LabelTextInput
                                    label="Stare hasło"
                                    inputId="oldPassword"
                                    errorText={
                                        changePasswordFormErrors.oldPassword
                                            ?.message
                                    }
                                    isPassword={true}
                                    textFieldProps={{
                                        ...changePasswordRegister(
                                            "oldPassword"
                                        ),
                                    }}
                                />
                                <LabelTextInput
                                    label="Nowe hasło"
                                    inputId="newPassword"
                                    errorText={
                                        changePasswordFormErrors.newPassword
                                            ?.message
                                    }
                                    isPassword={true}
                                    textFieldProps={{
                                        ...changePasswordRegister(
                                            "newPassword"
                                        ),
                                    }}
                                />
                                <LabelTextInput
                                    label="Potwierdź hasło"
                                    inputId="confirmPassword"
                                    errorText={
                                        changePasswordFormErrors.confirmPassword
                                            ?.message
                                    }
                                    isPassword={true}
                                    textFieldProps={{
                                        ...changePasswordRegister(
                                            "confirmPassword"
                                        ),
                                    }}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        loading={isLoadingChangePasswordForm}
                                        sx={{
                                            flexBasis: {
                                                xs: "100%",
                                                md: "auto",
                                            },
                                        }}
                                    >
                                        Zapisz
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </>
                    </CardContent>
                </Card>
            </Modal>
            <Modal
                open={openDeleteAccountModal}
                onClose={() =>
                    !isLoadingAccountDataForm && handleDeleteAccountModal(false)
                }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                data-size="small"
            >
                <Card>
                    <CardContent sx={{ m: 3 }}>
                        <>
                            <Typography variant="h6" component="h3">
                                Usuwanie konta
                            </Typography>
                            <Box sx={{ mt: 5 }}>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    Czy na pewno chcesz usunąć swoje konto?
                                </Typography>
                                <Typography variant="body1" color="red">
                                    Uwaga! Proces jest nieodwracalny. Po
                                    usunięciu nie będzie możliwości przywrócenia
                                    konta.
                                </Typography>
                                <Box
                                    sx={{
                                        mt: 5,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <LoadingButton
                                        variant="contained"
                                        loading={isLoadingDeleteAccountForm}
                                        onClick={handleSubmitDeleteAccountForm}
                                        sx={{
                                            mr: 1,
                                            flexBasis: {
                                                xs: "50%",
                                                md: "auto",
                                            },
                                        }}
                                    >
                                        Usuń
                                    </LoadingButton>
                                    <Button
                                        variant="outlined"
                                        disabled={isLoadingDeleteAccountForm}
                                        sx={{
                                            flexBasis: {
                                                xs: "50%",
                                                md: "auto",
                                            },
                                        }}
                                        onClick={() =>
                                            handleDeleteAccountModal(false)
                                        }
                                    >
                                        Anuluj
                                    </Button>
                                </Box>
                            </Box>
                        </>
                    </CardContent>
                </Card>
            </Modal>
            <ApiResponseAlert
                open={isApiResponseVisible}
                onClose={() => setIsApiResponseVisible(false)}
                response={apiResponse}
            />
        </>
    );
};

export default AccountDataForm;
