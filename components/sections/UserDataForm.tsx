"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Card,
    CardContent,
    Divider,
    Modal,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "dayjs/locale/pl";
import LabelTextInput from "../form/LabelTextInput";
import LabelDateInput from "../form/LabelDateInput";
import LabelButtonsInput from "../form/LabelButtonsInput";
import LabelSelectInput from "../form/LabelSelectInput";
import LabelAutocompleteInput from "../form/LabelAutocompleteInput";
import { Gender } from "@prisma/client";
import ApiResponseAlert, {
    ApiResponse,
} from "@/components/alerts/ApiResponseAlert";
import {
    settingsUserDataValidation,
    SettingsUserDataType,
} from "@/validation/common/settingsUserDataValidation";
import {
    createCityValidation,
    CreateCityType,
} from "@/validation/common/createCityValidation";
import dayjs from "dayjs";

type IdNameType = {
    id: number;
    name: string;
};

interface IUserDataFormProps {
    name: string;
    lastName: string;
    birthDate: Date | null;
    gender: string;
    nationalityId: number;
    cityId: number;
    cityName: string;
    nationalitiesList: IdNameType[];
}

const UserDataForm: React.FC<IUserDataFormProps> = ({
    name,
    lastName,
    birthDate,
    gender,
    nationalityId,
    cityId,
    cityName,
    nationalitiesList,
}) => {
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isApiResponseVisible, setIsApiResponseVisible] = useState(false);
    const {
        register: userDataRegister,
        control: userDataControl,
        handleSubmit: handleSubmitUserData,
        formState: { errors: userDataFormErrors },
    } = useForm<SettingsUserDataType>({
        resolver: zodResolver(settingsUserDataValidation),
        defaultValues: {
            name,
            lastName,
            birthDate: birthDate ? dayjs(birthDate) : undefined,
            gender,
            nationality: nationalityId,
            city: cityId,
        },
    });
    const {
        register: createCityRegister,
        control: createCityControl,
        handleSubmit: handleSubmitCreateCity,
        reset: resetCreateCityForm,
        formState: { errors: createCityFormErrors },
    } = useForm<CreateCityType>({
        resolver: zodResolver(createCityValidation),
        defaultValues: {
            country: 0,
            name: "",
        },
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);
    const [defaultCityId, setDefaultCityId] = useState<number>(
        cityId ? cityId : 0
    );
    const [cityInput, setCityInput] = useState<string>(
        cityName ? cityName : ""
    );
    const [citiesList, setCitiesList] = useState<IdNameType[]>([]);
    const [openAddCityModal, setOpenAddCityModal] = useState<boolean>(false);
    const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);

    useEffect(() => {
        setIsLoadingCities(true);

        const fetchData = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/get-cities-by-input`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cityInput),
                }
            );

            const result = await response.json();

            if (result.data) setCitiesList(result.data.cities);
            else setCitiesList([]);

            setIsLoadingCities(false);
        };

        fetchData();
    }, [cityInput]);

    const handleSubmitUserDataForm = async (data: SettingsUserDataType) => {
        setIsLoading(true);

        const { name, lastName, birthDate, gender, nationality, city } = data;

        const body = {
            name,
            lastName,
            birthDate,
            gender,
            nationality,
            city,
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/update-settings-user-data`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        const result = await response.json();

        setApiResponse(result);
        setIsApiResponseVisible(true);
        setIsLoading(false);
    };

    const handleCreateCity = () => {
        setOpenAddCityModal(!openAddCityModal);
        if (openAddCityModal) {
            resetCreateCityForm({
                country: 0,
                name: "",
            });
        }
    };

    const handleSubmitCreateCityForm = async (data: CreateCityType) => {
        setIsLoadingModal(true);

        const { country, name } = data;

        const body = {
            country,
            name,
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/create-city`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        const result = await response.json();

        resetCreateCityForm({
            country: 0,
            name: "",
        });

        handleCreateCity();
        setApiResponse(result);
        setIsApiResponseVisible(true);
        setIsLoadingModal(false);
    };

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmitUserData(handleSubmitUserDataForm)}
                sx={{ p: 2 }}
            >
                <Typography variant="h5" component="h2">
                    Dane użytkownika
                </Typography>
                <Divider sx={{ my: 2 }} />
                <LabelTextInput
                    label="Imię"
                    inputId="name"
                    errorText={userDataFormErrors.name?.message}
                    textFieldProps={{
                        ...userDataRegister("name"),
                    }}
                />
                <LabelTextInput
                    label="Nazwisko"
                    inputId="lastName"
                    errorText={userDataFormErrors.lastName?.message}
                    textFieldProps={{
                        ...userDataRegister("lastName"),
                    }}
                />
                <Controller
                    name="birthDate"
                    control={userDataControl}
                    render={({ field }) => (
                        <LabelDateInput
                            inputId="birthDate"
                            label="Data urodzenia"
                            value={field.value ?? null}
                            onChange={field.onChange}
                            errorText={userDataFormErrors.birthDate?.message}
                        />
                    )}
                />
                <Controller
                    name="gender"
                    control={userDataControl}
                    render={({ field }) => (
                        <LabelButtonsInput
                            label="Płeć"
                            inputId="gender"
                            value={field.value ?? ""}
                            errorText={userDataFormErrors.gender?.message}
                            buttons={[
                                { value: Gender.FEMALE, label: "Kobieta" },
                                { value: Gender.MALE, label: "Mężczyzna" },
                            ]}
                            onChange={(event, newValue) => {
                                field.onChange(newValue || "");
                            }}
                        />
                    )}
                />
                <Controller
                    name="nationality"
                    control={userDataControl}
                    render={({ field }) => (
                        <LabelSelectInput
                            label="Narodowość"
                            inputId="nationality"
                            value={field.value?.toString() ?? ""}
                            errorText={userDataFormErrors.nationality?.message}
                            dataList={nationalitiesList}
                            onChange={(event) => {
                                field.onChange(Number(event.target.value));
                            }}
                        />
                    )}
                />
                <Controller
                    name="city"
                    control={userDataControl}
                    render={({ field, fieldState }) => (
                        <LabelAutocompleteInput
                            label="Miasto"
                            inputId="city"
                            inputValue={cityInput}
                            defaultId={defaultCityId}
                            isButton={true}
                            buttonText="Dodaj nowe miasto"
                            errorText={fieldState.error?.message}
                            dataList={citiesList}
                            isLoadingData={isLoadingCities}
                            onChange={(event, newValue) =>
                                field.onChange(newValue ? newValue.id : 0)
                            }
                            onInputChange={(event, newInputValue, reason) => {
                                setCityInput(newInputValue);
                            }}
                            onButtonClick={handleCreateCity}
                        />
                    )}
                />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        mb: userDataFormErrors.city ? 0 : 2,
                    }}
                >
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isLoading}
                        sx={{
                            flexBasis: { xs: "100%", md: "auto" },
                        }}
                    >
                        Zapisz
                    </LoadingButton>
                </Box>
            </Box>
            <Modal
                open={openAddCityModal}
                onClose={() => handleCreateCity()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                data-size="medium"
            >
                <Card>
                    <CardContent sx={{ m: 3 }}>
                        <Typography variant="h6" component="h3">
                            Dodawanie nowego miasta
                        </Typography>
                        <Box
                            component="form"
                            sx={{ mt: 5 }}
                            onSubmit={handleSubmitCreateCity(
                                handleSubmitCreateCityForm
                            )}
                        >
                            <Controller
                                name="country"
                                control={createCityControl}
                                render={({ field }) => (
                                    <LabelSelectInput
                                        label="Kraj"
                                        inputId="country"
                                        value={field.value?.toString() ?? ""}
                                        errorText={
                                            createCityFormErrors.country
                                                ?.message
                                        }
                                        dataList={nationalitiesList}
                                        onChange={(event) => {
                                            field.onChange(
                                                Number(event.target.value)
                                            );
                                        }}
                                    />
                                )}
                            />
                            <LabelTextInput
                                label="Nazwa"
                                inputId="cityName"
                                errorText={createCityFormErrors.name?.message}
                                textFieldProps={{
                                    ...createCityRegister("name"),
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
                                    loading={isLoadingModal}
                                    sx={{
                                        flexBasis: { xs: "100%", md: "auto" },
                                    }}
                                >
                                    Zapisz
                                </LoadingButton>
                            </Box>
                        </Box>
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

export default UserDataForm;
