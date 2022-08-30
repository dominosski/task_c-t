interface dataMapper {
    "uuid": number
    "name": string,
    "email": string,
    "login": string,
    "status": string,
}

export const dataMapper = (data: any) => {
    const transformedData: dataMapper = {
        uuid: data.id,
        name: data.name,
        email: data.email,
        login: data.email.substring(0, data.email.indexOf("@")),
        status: data.status,
    }
    return transformedData
}
