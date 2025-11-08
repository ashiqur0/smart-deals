import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';
import { use } from 'react';

const googleProvider = new GoogleAuthProvider();
const allProductsPromise = fetch('http://localhost:3000/products').then(res => res.json());
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const allProducts = use(allProductsPromise);

    // signup
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // signIn
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(email, password);
    }

    // Google SignIn
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // SignOut
    const signout = () => {
        setLoading(true);
        return signOut(auth);
    }

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log('current user', currentUser);

            if (currentUser) {
                const loggedUser = { email: currentUser.email };
                fetch('http://localhost:3000/getToken', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('after getting token', data);
                        localStorage.setItem('token', data.token)
                    })
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        createUser,
        signInUser,
        signInWithGoogle,
        signout,
        user,
        loading,
        allProducts,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;