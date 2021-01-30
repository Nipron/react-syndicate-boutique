import {auth} from '../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
    const config = {
        url: 'https://react-syndicate-boutique.netlify.app/login'
        // url: 'http://localhost:3000/login'
    }

    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email, config)
            .then(() => {
                resolve();
            })
            .catch(() => {
                const err = ['E-mail not found. Please try again'];
                reject(err);
            })
    })

}