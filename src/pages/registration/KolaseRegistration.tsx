import RegistrationPage from './RegistrationPage.jsx'
import { kolase } from '../../config/registrationConfigs.js'

/** Halaman pendaftaran Lomba Kolase Anak dan Orang Tua (/pendaftaran/kolase). */
export default function KolaseRegistration() {
  return <RegistrationPage config={kolase} />
}