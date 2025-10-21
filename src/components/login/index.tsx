'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import Box from '@mui/material/Box'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { signIn } from "next-auth/react"
import Link from 'next/link'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import CustomButton from 'src/@core/components/button'
import CustomTextField from 'src/@core/components/text-fields'
import themeConfig from 'src/configs/themeConfig'
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'
import { z } from 'zod'

// Zod schema
const loginSchema = z.object({
    userName: z.string().min(1, { message: 'نام کاربری نمی‌تواند خالی باشد' }),
    password: z.string().min(8, { message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' }),
    remember: z.boolean().optional()
})

type LoginFormInputs = z.infer<typeof loginSchema>

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
    fontSize: '0.875rem',
    direction: "rtl",
    textDecoration: 'none',
    color: theme.palette.primary.main
}))



const LoginV1 = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [focused, setFocused] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)
    const { handleSubmit, control, formState: { errors, isValid } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: { userName: '', password: '', remember: false },
        mode: 'onChange'
    })


    const theme = useTheme()

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        const result = await signIn("credentials", {
            redirect: false,
            username: data.userName,
            password: data.password,
        });

        if (result?.error) {
            setApiError("نام کاربری یا رمز عبور اشتباه است");
        } else {
            window.location.href = "/";
        }
    };

    return (
        <Box className='content-center'>
            <AuthIllustrationV1Wrapper>
                <Card>
                    <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
                        <Box sx={{ mb: 4, gap: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '1.625rem', lineHeight: 1.385 }}>

                                {themeConfig.templateName}

                            </Typography>
                            <svg width={34} height={23.375} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    fill={theme.palette.primary.main}
                                    d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
                                />
                                <path
                                    fill='#161616'
                                    opacity={0.06}
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
                                />
                                <path
                                    fill='#161616'
                                    opacity={0.06}
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    fill={theme.palette.primary.main}
                                    d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
                                />
                            </svg>
                        </Box>

                        <h4 className='text-center'>
                            ورود به حساب کاربری
                        </h4>
                        {apiError && <Typography variant='body2' color='error'>{apiError}</Typography>}


                        <form noValidate onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name='userName'
                                control={control}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        dir="rtl"
                                        fullWidth
                                        label='نام کاربری'
                                        error={!!errors.userName}
                                        helperText={errors.userName?.message}
                                    />
                                )}
                            />

                            <Controller
                                name='password'
                                control={control}
                                render={({ field }) => {


                                    return (
                                        <FormControl fullWidth sx={{ mt: 4 }}>
                                            <CustomTextField
                                                label="رمز عبور"
                                                id="auth-login-password"
                                                type={showPassword ? "text" : "password"}
                                                error={!!errors.password}
                                                {...field}
                                                onFocus={() => setFocused(true)}
                                                onBlur={() => setFocused(false)}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {showPassword ? (
                                                                <RemoveRedEyeOutlinedIcon
                                                                    sx={{
                                                                        color: focused
                                                                            ? theme.palette.primary.main
                                                                            : "#555",
                                                                        cursor: "pointer"
                                                                    }}
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                    onMouseDown={(e) => e.preventDefault()}
                                                                />
                                                            ) : (
                                                                <VisibilityOffOutlinedIcon
                                                                    sx={{
                                                                        color: focused
                                                                            ? theme.palette.primary.main
                                                                            : "#555",
                                                                        cursor: "pointer"
                                                                    }}
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                    onMouseDown={(e) => e.preventDefault()}
                                                                />
                                                            )}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            {errors.password && (
                                                <Typography sx={{ mt: 2 }} variant='caption' color='error'>
                                                    {errors.password.message}
                                                </Typography>
                                            )}
                                        </FormControl>
                                    )
                                }}
                            />


                            <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <LinkStyled href='/forgot-password'>فراموشی رمز عبور</LinkStyled>

                            </Box>

                            <CustomButton disabled={!isValid} label="ورود" width='21rem' type='submit' variant='contained' sx={{ mb: 4, color: "white" }} />

                        </form>
                    </CardContent>
                </Card>
            </AuthIllustrationV1Wrapper>
        </Box>
    )
}

export default LoginV1
