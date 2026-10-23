import RegistrationPage from './RegistrationPage.jsx'
import { bacaPuisi } from '../../config/registrationConfigs.js'

/** Halaman pendaftaran Lomba Baca Puisi (/pendaftaran/baca-puisi). */
export default function BacaPuisiRegistration() {
  return <RegistrationPage config={bacaPuisi} />
}