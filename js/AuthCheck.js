
class AuthCheck {
    loggedUser = {
        userid: '',
        firstname: '',
        secondName: ''
    }

    checkLoggedUser() {
        const loginUser = localStorage.getItem('userData');
        if (loginUser) {            
            const userData = JSON.parse(loginUser);
            const token = this.decodeToken(userData.token);
            this.loggedUser = {
                userId: token.userId,
                firstName: token.firstName,
                secondName: token.secondName
            }
            return true;
        }
        return false;
    }

    decodeToken(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decodedToken = JSON.parse(jsonPayload);
        return decodedToken;
    }
}

export const authCheck = new AuthCheck();