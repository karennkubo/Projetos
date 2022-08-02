export const goToHomePage = (navigate) => {
    navigate("/")
}
export const goToListTripsPage = (navigate) => {
    navigate("/trips/list")
}
export const goToApplicationForm = (navigate) => {
    navigate("/trips/application")
}
export const goToLogin = (navigate) => {
    navigate("/login")
}
export const goToAdminHomePage = (navigate) => {
    navigate(`/admin/trips/list`)
}
export const goToCreateTripPage = (navigate) => {
    navigate(`/admin/trips/create`)
}
export const goToTripDetailsPage= (navigate, id) => {
    navigate(`/admin/trips/${id}`)
}
export const goBack = (navigate) => {
    navigate(-1);
}