import { redirect } from 'next/navigation'

export default function Home() {
  // In a real application, we would check the authentication status here
  // For now, we'll always redirect to the login page
  redirect('/login')
}
