import { redirect } from 'next/navigation';

export default function BecomeMentorPage() {
  redirect('/register?role=mentor');
}
