import RegistrationPage from './RegistrationPage.jsx'
import { praTka } from '../../config/registrationConfigs.js'

/** Halaman pendaftaran Lomba Pra-TKA (/pendaftaran/pra-tka). */
export default function PraTKARegistration() {
  return <RegistrationPage config={praTka} />
}
