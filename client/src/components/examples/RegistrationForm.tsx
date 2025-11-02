import { RegistrationForm } from '../RegistrationForm';

export default function RegistrationFormExample() {
  return (
    <RegistrationForm
      eventId="1"
      eventTitle="Introduction to Machine Learning"
      onSuccess={() => console.log('Registration successful')}
    />
  );
}
