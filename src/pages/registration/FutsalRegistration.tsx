import RegistrationPage from './RegistrationPage.jsx'
import { futsal } from '../../config/registrationConfigs.js'

/** Halaman pendaftaran Lomba Futsal (/pendaftaran/futsal). */
export default function FutsalRegistration() {
  return <RegistrationPage config={futsal} />
}