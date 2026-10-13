import RegistrationPage from './RegistrationPage.jsx'
import { olimpiade } from '../../config/registrationConfigs.js'

/** Halaman pendaftaran Olimpiade (/pendaftaran/olimpiade). */
export default function OlimpiadeRegistration() {
  return <RegistrationPage config={olimpiade} />
}