"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
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
import dayjs, { Dayjs } from "dayjs";
import { settingsUserDataClientValidation } from "@/validation/client/settingsUserDataClientValidation";
import LabelTextInput from "../form/LabelTextInput";
import LabelDateInput from "../form/LabelDateInput";
import LabelButtonsInput from "../form/LabelButtonsInput";
import LabelSelectInput from "../form/LabelSelectInput";
import LabelAutocompleteInput from "../form/LabelAutocompleteInput";

interface INationality {
    id: number;
    name: string;
}

interface ICities {
    id: number;
    name: string;
}

interface IUserDataFormProps {
    userId: string | undefined;
    name: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    nationalityId: number;
    cityId: number;
    cityName: string;
    nationalitiesList: INationality[];
}

interface IUserSettingsForm {
    name: string;
    lastName: string;
    birthDate: Dayjs | null;
    gender: string;
    nationality: number;
    city: number;
}

interface INewCityForm {
    country: string;
    name: string;
}

const UserDataForm: React.FC<IUserDataFormProps> = ({
    userId,
    name,
    lastName,
    birthDate,
    gender,
    nationalityId,
    cityId,
    cityName,
    nationalitiesList,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userSettingsForm, setUserSettingsForm] = useState<IUserSettingsForm>(
        {
            name,
            lastName,
            birthDate: birthDate ? dayjs(birthDate) : null,
            gender,
            nationality: nationalityId,
            city: cityId,
        }
    );
    const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);
    const [defaultCityId, setDefaultCityId] = useState<number>(
        cityId ? cityId : 0
    );
    const [cityInput, setCityInput] = useState<string>(
        cityName ? cityName : ""
    );
    const [citiesList, setCitiesList] = useState<ICities[]>([]);
    const [error, setError] = useState({
        name: "",
        lastName: "",
        birthDate: "",
        gender: "",
        nationality: "",
        city: "",
    });
    const [isUpdateMessageVisible, setIsUpdateMessageVisible] =
        useState<boolean>(false);

    const [openAddCityModal, setOpenAddCityModal] = useState<boolean>(false);
    const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
    const [newCityForm, setNewCityForm] = useState<INewCityForm>({
        country: "",
        name: "",
    });

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

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const res = await response.json();

            if (res.cities) setCitiesList(res.cities);
            else setCitiesList([]);

            setIsLoadingCities(false);
        };

        fetchData();
    }, [cityInput]);

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const { name, lastName, birthDate, gender, nationality, city } =
            userSettingsForm;

        const validationResult = settingsUserDataClientValidation(
            name === null ? "" : "",
            lastName === null ? "" : "",
            birthDate,
            cityInput
        );

        if (!validationResult.success) {
            let newErrors = {
                name: "",
                lastName: "",
                birthDate: "",
                gender: "",
                nationality: "",
                city: "",
            };

            validationResult.error.issues.forEach((error) => {
                const fieldName = error.path[0];
                const errorMessage = error.message;
                if (newErrors[fieldName as keyof IUserSettingsForm]) return;
                newErrors[fieldName as keyof IUserSettingsForm] = errorMessage;
            });

            setError(newErrors);
            setIsLoading(false);
        } else {
            setError({
                name: "",
                lastName: "",
                birthDate: "",
                gender: "",
                nationality: "",
                city: "",
            });

            const body = {
                name,
                lastName,
                birthDate: birthDate?.toDate(),
                gender,
                nationality,
                city,
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/update-user-data/${userId}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );

            const data = await response.json();

            // if (!data.errorMessage) router.push(`/verification?id=${data.res}`); // TODO do poprawy podczas prac nad obsługą błędów

            console.log(data); // TODO do poprawy podczas prac nad obsługą błędow

            setIsLoading(false);
            setIsUpdateMessageVisible(true);
        }
    };

    const handleAddCity = () => {
        setNewCityForm({ country: "", name: "" });
        setOpenAddCityModal(!openAddCityModal);
    };

    const handleSubmitAddNewCity = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoadingModal(true);

        // TODO Walidacja (do zrobienia podczas pracy nad obsługą błędów)

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/create-city`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCityForm),
            }
        );

        const data = await response.json();

        handleAddCity();
        setIsLoadingModal(false);
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmitForm} sx={{ p: 2 }}>
                <Typography variant="h5" component="h2">
                    Dane użytkownika
                </Typography>
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
                <LabelTextInput
                    label="Imię"
                    inputId="name"
                    inputName="name"
                    inputValue={userSettingsForm.name}
                    errorText={error.name}
                    onChange={(e) =>
                        setUserSettingsForm((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                        }))
                    }
                />
                <LabelTextInput
                    label="Nazwisko"
                    inputId="lastName"
                    inputName="lastName"
                    inputValue={userSettingsForm.lastName}
                    errorText={error.lastName}
                    onChange={(e) =>
                        setUserSettingsForm((prevState) => ({
                            ...prevState,
                            lastName: e.target.value,
                        }))
                    }
                />
                <LabelDateInput
                    label="Data urodzenia"
                    inputId="birthDate"
                    inputName="birthDate"
                    inputValue={userSettingsForm.birthDate}
                    errorText={error.birthDate}
                    onChange={(newValue) =>
                        setUserSettingsForm((prevState) => ({
                            ...prevState,
                            birthDate: newValue,
                        }))
                    }
                />
                <LabelButtonsInput
                    label="Płeć"
                    inputId="gender"
                    inputName="gender"
                    inputValue={userSettingsForm.gender}
                    errorText={error.gender}
                    buttons={[
                        { value: "FEMALE", label: "Kobieta" },
                        { value: "MALE", label: "Mężczyzna" },
                    ]}
                    onChange={(e, value) =>
                        setUserSettingsForm((prevState) => ({
                            ...prevState,
                            gender: value,
                        }))
                    }
                />
                <LabelSelectInput
                    label="Narodowość"
                    inputId="nationality"
                    inputName="nationality"
                    inputValue={userSettingsForm.nationality?.toString()}
                    errorText={error.nationality}
                    dataList={nationalitiesList}
                    onChange={(e) =>
                        setUserSettingsForm((prevState) => ({
                            ...prevState,
                            nationality: e.target.value
                                ? Number(e.target.value)
                                : 0,
                        }))
                    }
                />
                <LabelAutocompleteInput
                    label="Miasto"
                    inputId="city"
                    inputName="city"
                    inputValue={cityInput}
                    defaultId={defaultCityId}
                    isButton={true}
                    buttonText="Dodaj nowe miasto"
                    errorText={error.city}
                    dataList={citiesList}
                    isLoadingData={isLoadingCities}
                    onChange={(e, newValue) => {
                        setUserSettingsForm((prevState) => ({
                            ...prevState,
                            city: newValue ? Number(newValue.id) : 0,
                        }));
                    }}
                    onInputChange={(event, newInputValue, reason) => {
                        setCityInput(newInputValue);
                    }}
                    onButtonClick={handleAddCity}
                />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        mb: error.city ? 0 : 2,
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
                onClose={() => handleAddCity()}
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
                            onSubmit={handleSubmitAddNewCity}
                        >
                            <LabelSelectInput
                                label="Kraj"
                                inputId="country"
                                inputName="country"
                                inputValue={newCityForm.country}
                                dataList={nationalitiesList}
                                onChange={(e) =>
                                    setNewCityForm((prevState) => ({
                                        ...prevState,
                                        country: e.target.value,
                                    }))
                                }
                            />
                            <LabelTextInput
                                label="Nazwa"
                                inputId="cityName"
                                inputName="cityName"
                                inputValue={newCityForm.name}
                                onChange={(e) =>
                                    setNewCityForm((prevState) => ({
                                        ...prevState,
                                        name: e.target.value,
                                    }))
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
        </>
    );
};

export default UserDataForm;
