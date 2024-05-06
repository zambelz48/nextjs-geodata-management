import React from "react"
import { Container } from "@/components/Container"
import { FormContainer } from "@/components/FormContainer"
import { FormInput } from "@/components/FormInput"
import { SubmitButton } from "@/components/SubmitButton"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { getProviders, getSession, signIn } from "next-auth/react"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

interface LoginInput {
  email: string
  password: string
}

const loginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid"),
  password: Yup.string()
    .required("Password is required"),
})

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context
  const session = await getSession({ req })
  const providers = await getProviders()
  if (session) {
    return {
      redirect: { destination: "/" },
    }
  }
  return {
    props: {
      providers,
    },
  }
}

export default function Page() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const form = useForm<LoginInput>({
    resolver: yupResolver(loginFormValidationSchema),
  })

  const handleSubmit = async (value: LoginInput) => {
    try {
      setIsSubmitting(true)
      await signIn("credentials", {
        email: value.email,
        password: value.password,
      })

      setIsSubmitting(false)
      router.replace("/")
    } catch (error) {
      setIsSubmitting(false)
      console.error("[X] signInError: ", error)
    }
  }

  return (
    <Container>
      <FormContainer form={form} onSubmit={handleSubmit}>
        <FormInput
          form={form}
          label="Email"
          type="email"
          name="email"
          error={form.formState.errors.email}
        />
        <FormInput
          form={form}
          label="Password"
          type="password"
          name="password"
          error={form.formState.errors.password}
        />
        <SubmitButton disabled={isSubmitting} label="Login" />
      </FormContainer>
    </Container>
  )
}
