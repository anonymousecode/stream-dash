"use client"
import Link from 'next/link'
import React from 'react'
import { FiFacebook, FiGithub, FiTwitter } from 'react-icons/fi'
import { useState } from 'react'
import { login } from '@/api/methods'
import { useRouter } from 'next/navigation'

const LoginForm = ({ registerPath, resetPath }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {


        console.log("Login function is called");
        console.log(email, password);
        e.preventDefault();
        login(email, password)
            .then((response) => {
                if (response) {
                    console.log("There is a response");
                    console.log(response);
                    router.push("/dashboard");
                } else {
                    console.log("There is no response");
                }
            })
            .catch((err) => {
                console.log(err, "There is an error");
            });
    };

    return (
        <>
            {/* <h2 className="fs-20 fw-bolder mb-3">Login</h2> */}
            {/* <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
            <p className="fs-12 fw-medium text-muted">Thank you for get back <strong>Nelel</strong> web applications, let's access our the best recommendation for you.</p> */}
            <form action="index.html" className="w-100 mt-3 pt-2" onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor=""  className='pb-1'>Email</label>
                    <input type="email" className="form-control" placeholder="Email or Username" defaultValue="" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className='pb-1'>Password</label>
                    <input type="password" className="form-control" placeholder="Password" defaultValue="" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="rememberMe" />
                            <label className="custom-control-label c-pointer" htmlFor="rememberMe">Remember me</label>
                        </div>
                    </div>
                    <div>
                        <Link href={resetPath} className="fs-11 text-primary">Forgot password?</Link>
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit" className="btn btn-lg btn-primary w-100" >Login</button>
                </div>
            </form>
            <div className="mt-3 text-muted  text-center">
                <span> Don't have an account? Register now</span>
                {/* <Link href={registerPath} className="fw-bold"> Create an Account</Link> */}
            </div>
            <div className="w-100 mt-3 text-center mx-auto">
                {/* <div className="mb-4 border-bottom position-relative">
                    <span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">or</span>
                </div> */}
                <div className="d-flex flex-column gap-2">
                    <Link href="/authentication/student-register" className="btn btn-outline-primary w-100">
                        Register as Student
                    </Link>
                    <Link href="/authentication/user-register" className="btn btn-outline-secondary w-100">
                        Register as Non-Student
                    </Link>
                </div>
            </div>

            
        </>
    )
}

export default LoginForm