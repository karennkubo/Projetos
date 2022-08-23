export const goToLogin = (navigate) => {
    navigate("/");
};

export const goToFeed = (navigate) => {
    navigate("/feed");
};

export const goToSignUp = (navigate) => {
    navigate("/signup");
};

export const goToSignUpAddress = (navigate) => {
    navigate("/signup/address");
};

export const goToRestaurant = (navigate, restaurantId) => {
    navigate(`/feed/${restaurantId}`);
};

export const goToCart = (navigate) => {
    navigate("/cart");
};

export const goToProfile = (navigate) => {
    navigate("/profile");
};