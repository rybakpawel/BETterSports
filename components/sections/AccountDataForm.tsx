"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { z } from "zod";
import { signOut } from "next-auth/react";

interface ISport {
    id: number;
    name: string;
}

interface ITeam {
    id: number;
    name: string;
}

interface IAccountDataFormProps {
    userId: string | undefined;
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

interface IAccountSettingsForm {
    username: string;
    favouriteSport: number;
    favouriteTeam: number;
    primaryColor: string;
    secondaryColor: string;
}

interface IChangePasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const AccountDataForm: React.FC<IAccountDataFormProps> = ({
    userId,
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
    const [isLoadingAccountDataForm, setIsLoadingAccountDataForm] =
        useState<boolean>(false);
    const [isLoadingChangePasswordForm, setIsLoadingChangePasswordForm] =
        useState<boolean>(false);
    const [isLoadingDeleteAccountForm, setIsLoadingDeleteAccountForm] =
        useState<boolean>(false);
    const [accountSettingsForm, setAccountSettingsForm] =
        useState<IAccountSettingsForm>({
            username,
            favouriteSport: favouriteSportId,
            favouriteTeam: favouriteTeamId,
            primaryColor: primaryColor,
            secondaryColor: secondaryColor,
        });
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
    const [error, setError] = useState({
        username: "",
        profileImage: "",
        backgroundImage: "",
        favouriteSport: "",
        favouriteTeam: "",
        primaryColor: "",
        secondaryColor: "",
    });
    const [changePasswordError, setChangePasswordError] =
        useState<IChangePasswordForm>({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    const [isUpdateMessageVisible, setIsUpdateMessageVisible] =
        useState<boolean>(false);
    const [openChangePasswordModal, setOpenChangePasswordModal] =
        useState<boolean>(false);
    const [openDeleteAccountModal, setOpenDeleteAccountModal] =
        useState<boolean>(false);
    const [changePasswordForm, setChangePasswordForm] =
        useState<IChangePasswordForm>({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    const [changePasswordFormSaved, setChangePasswordFormSaved] =
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

            if (!response.ok) {
                throw new Error("Błąd podczas wczytywania drużyn");
            }

            const res = await response.json();

            if (res.teams) setTeamsList(res.teams);
            else setTeamsList([]);

            setIsLoadingTeams(false);
        };

        fetchData();
    }, [teamInput]);

    const handleChangePasswordModal = (state: boolean) => {
        if (isLoadingAccountDataForm) return;
        setOpenChangePasswordModal(state);
        setChangePasswordFormSaved(false);
        setChangePasswordForm({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const handleDeleteAccountModal = (state: boolean) => {
        if (isLoadingAccountDataForm) return;
        setOpenDeleteAccountModal(state);
    };

    const handleFileChange = (file: File, inputId: string) => {
        setSelectedFiles((prev) => ({ ...prev, [inputId]: file }));
    };

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        } = accountSettingsForm;

        // ! Walidacja
        // const validationResult = settingsUserDataClientValidation(
        //     username,
        //     password,
        // );

        // if (!validationResult.success) {
        //     let newErrors = {
        //         username: "",
        //         password: "",
        //     };

        //     validationResult.error.issues.forEach((error) => {
        //         const fieldName = error.path[0];
        //         const errorMessage = error.message;
        //         if (newErrors[fieldName as keyof IAccountSettingsForm]) return;
        //         newErrors[fieldName as keyof IAccountSettingsForm] = errorMessage;
        //     });

        //     setError(newErrors);
        //     setIsLoading(false);
        // } else {
        setError({
            username: "",
            profileImage: "",
            backgroundImage: "",
            favouriteSport: "",
            favouriteTeam: "",
            primaryColor: "",
            secondaryColor: "",
        });

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
            `${process.env.NEXT_PUBLIC_API_URL}/update-account-data/${userId}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();

        // if (!data.errorMessage) router.push(`/verification?id=${data.res}`); // TODO do poprawy podczas prac nad obsługą błędów

        console.log(data); // TODO do poprawy podczas prac nad obsługą błędow

        setIsLoadingAccountDataForm(false);
        setIsUpdateMessageVisible(true);

        if (profileImage.newUrl || backgroundImage.newUrl) {
            router.refresh();
        }
    };

    const handleSubmitChangePasswordForm = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoadingChangePasswordForm(true);

        // client validation - do przemyślenia czy nie przenieść walidacji klienckich do osobnego katalogu
        const validationSchema = z
            .object({
                oldPassword: z.string().min(1, { message: "Uzupełnij pole." }),
                newPassword: z
                    .string()
                    .min(8, {
                        message: "Hasło musi zawierać co najmniej 8 znaków.",
                    })
                    .regex(new RegExp(".*[A-Z].*"), {
                        message: "Hasło musi zawierać wielką literę.",
                    })
                    .regex(new RegExp(".*\\d.*"), {
                        message: "Hasło musi zawierać cyfrę.",
                    })
                    .regex(
                        new RegExp(
                            ".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"
                        ),
                        { message: "Hasło musi zawierać znak specjalny." }
                    ),
                confirmPassword: z
                    .string()
                    .min(1, { message: "Uzupełnij pole." }),
            })
            .superRefine(({ confirmPassword, newPassword }, ctx) => {
                if (confirmPassword !== newPassword) {
                    ctx.addIssue({
                        code: "custom",
                        path: ["confirmPassword"],
                        message: "Hasła nie są takie same.",
                    });
                }
            });
        const validationResult = validationSchema.safeParse(changePasswordForm);

        if (!validationResult.success) {
            let newErrors = {
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            };

            validationResult.error.issues.forEach((error) => {
                const fieldName = error.path[0];
                const errorMessage = error.message;
                if (newErrors[fieldName as keyof IChangePasswordForm]) return;
                newErrors[fieldName as keyof IChangePasswordForm] =
                    errorMessage;
            });

            setChangePasswordError(newErrors);
            setIsLoadingChangePasswordForm(false);
        } else {
            const { oldPassword, newPassword } = changePasswordForm;

            const body = {
                oldPassword,
                newPassword,
                userId,
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );

            const data = await response.json();

            // TODO obsługa błędów! walidacja jest zrobiona, tylko wyświetlić dobrze komunikat + dopasować do nowego systemu obsługi błędów
            if (data.error) {
            } else {
                setChangePasswordFormSaved(true);
            }

            setIsLoadingChangePasswordForm(false);
        }
    };

    const handleSubmitDeleteAccountForm = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoadingDeleteAccountForm(true);

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-account`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        signOut();
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
                            type="submit"
                            variant="outlined"
                            loading={isLoadingAccountDataForm}
                            onClick={() => handleChangePasswordModal(true)}
                        >
                            Zmień hasło
                        </LoadingButton>
                        <LoadingButton
                            type="submit"
                            variant="outlined"
                            loading={isLoadingAccountDataForm}
                            onClick={() => handleDeleteAccountModal(true)}
                            sx={{ ml: 1 }}
                        >
                            Usuń konto
                        </LoadingButton>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />
                <Typography
                    component="span"
                    sx={{
                        display: isUpdateMessageVisible ? "block" : "none",
                        mb: 2,
                        textAlign: "center",
                        color: "primary.main",
                    }}
                >
                    Zaktualizowano dane!
                </Typography>
                <Box component="form" onSubmit={handleSubmitForm}>
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
                        inputName="username"
                        inputValue={accountSettingsForm.username}
                        errorText={error.username}
                        onChange={(e) =>
                            setAccountSettingsForm((prevState) => ({
                                ...prevState,
                                username: e.target.value,
                            }))
                        }
                    />
                    <LabelSelectInput
                        label="Ulubiony sport"
                        inputId="favouriteSport"
                        inputName="favouriteSport"
                        inputValue={accountSettingsForm.favouriteSport?.toString()}
                        errorText={error.favouriteSport}
                        dataList={sportsList}
                        onChange={(e) =>
                            setAccountSettingsForm((prevState) => ({
                                ...prevState,
                                favouriteSport: e.target.value
                                    ? Number(e.target.value)
                                    : 0,
                            }))
                        }
                    />
                    <LabelAutocompleteInput
                        label="Ulubiona drużyna"
                        inputId="favouriteTeam"
                        inputName="favouriteTeam"
                        inputValue={teamInput}
                        defaultId={defaultTeamId}
                        errorText={error.favouriteTeam}
                        dataList={teamsList}
                        isLoadingData={isLoadingTeams}
                        onChange={(e, newValue) => {
                            setAccountSettingsForm((prevState) => ({
                                ...prevState,
                                favouriteTeam: newValue
                                    ? Number(newValue.id)
                                    : 0,
                            }));
                        }}
                        onInputChange={(event, newInputValue, reason) => {
                            setTeamInput(newInputValue);
                        }}
                    />

                    <LabelColorInput
                        label="Kolor podstawowy"
                        inputId="primaryColor"
                        inputName="primaryColor"
                        inputValue={
                            accountSettingsForm.primaryColor
                                ? accountSettingsForm.primaryColor
                                : "#FFFFFF"
                        }
                        onChange={(color) => {
                            setAccountSettingsForm((prevState) => ({
                                ...prevState,
                                primaryColor: color,
                            }));
                        }}
                    />
                    <LabelColorInput
                        label="Kolor drugorzędny"
                        inputId="secondaryColor"
                        inputName="secondaryColor"
                        inputValue={
                            accountSettingsForm.secondaryColor
                                ? accountSettingsForm.secondaryColor
                                : "#FFFFFF"
                        }
                        onChange={(color) => {
                            setAccountSettingsForm((prevState) => ({
                                ...prevState,
                                secondaryColor: color,
                            }));
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            // mb: error.password ? 0 : 2, // ! error.password do zmiany na error.secondaryColor
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
                onClose={() => handleChangePasswordModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                data-size="medium"
            >
                <Card>
                    <CardContent sx={{ m: 3 }}>
                        {!changePasswordFormSaved ? (
                            <>
                                <Typography variant="h6" component="h3">
                                    Ustawianie nowego hasła
                                </Typography>
                                <Box
                                    component="form"
                                    sx={{ mt: 5 }}
                                    onSubmit={handleSubmitChangePasswordForm}
                                >
                                    <LabelTextInput
                                        label="Stare hasło"
                                        inputId="oldPassword"
                                        inputName="oldPassword"
                                        inputValue={
                                            changePasswordForm.oldPassword
                                        }
                                        errorText={
                                            changePasswordError.oldPassword
                                        }
                                        isPassword={true}
                                        onChange={(e) =>
                                            setChangePasswordForm(
                                                (prevState) => ({
                                                    ...prevState,
                                                    oldPassword: e.target.value,
                                                })
                                            )
                                        }
                                    />
                                    <LabelTextInput
                                        label="Nowe hasło"
                                        inputId="newPassword"
                                        inputName="newPassword"
                                        inputValue={
                                            changePasswordForm.newPassword
                                        }
                                        errorText={
                                            changePasswordError.newPassword
                                        }
                                        isPassword={true}
                                        onChange={(e) =>
                                            setChangePasswordForm(
                                                (prevState) => ({
                                                    ...prevState,
                                                    newPassword: e.target.value,
                                                })
                                            )
                                        }
                                    />
                                    <LabelTextInput
                                        label="Potwierdź hasło"
                                        inputId="confirmPassword"
                                        inputName="confirmPassword"
                                        inputValue={
                                            changePasswordForm.confirmPassword
                                        }
                                        errorText={
                                            changePasswordError.confirmPassword
                                        }
                                        isPassword={true}
                                        onChange={(e) =>
                                            setChangePasswordForm(
                                                (prevState) => ({
                                                    ...prevState,
                                                    confirmPassword:
                                                        e.target.value,
                                                })
                                            )
                                        }
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
                                            loading={
                                                isLoadingChangePasswordForm
                                            }
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
                        ) : (
                            <>
                                <Typography variant="h6" component="h3">
                                    Sukces!
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    Twoje hasło zostało zaktualizowane.
                                </Typography>
                            </>
                        )}
                    </CardContent>
                </Card>
            </Modal>
            <Modal
                open={openDeleteAccountModal}
                onClose={() => handleDeleteAccountModal(false)}
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
                            <Box
                                component="form"
                                sx={{ mt: 5 }}
                                onSubmit={handleSubmitDeleteAccountForm}
                            >
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
                                        type="submit"
                                        variant="contained"
                                        loading={isLoadingDeleteAccountForm}
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
        </>
    );
};

export default AccountDataForm;
