interface DataMapper {
    "uuid": number
    "name": string,
    "email": string,
    "login": string,
    "status": string,
}

export const dataMapper = (data: any) => {
    const transformedData: DataMapper = {
        uuid: data.id,
        name: data.name,
        email: data.email,
        login: data.email.substring(0, data.email.indexOf("@")),
        status: data.status,
    }
    return transformedData
}
