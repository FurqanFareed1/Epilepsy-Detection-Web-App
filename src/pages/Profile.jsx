import { motion } from 'framer-motion'
import { User, Phone, Mail, Stethoscope, Pill, Heart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const patientData = {
  name: 'Talha Arshad',
  age: 22,
  condition: 'Epilepsy',
  medications: [
    { name: 'Levetiracetam', dosage: '500mg', frequency: 'Twice daily' },
    { name: 'Lamotrigine', dosage: '100mg', frequency: 'Once daily' },
  ],
  emergencyContacts: [
    { name: 'Furqan Fareed', relation: 'Father', phone: '+92 (333) 123-4567' },
    { name: 'Osaid Amjad', relation: 'Mother', phone: '+92 (311) 234-5678' },
  ],
  healthcareProvider: {
    name: 'Dr. Saqlain Mushtaq',
    specialty: 'Neurologist',
    phone: '+92 (300) 345-6789',
    email: 'saqlainmushtaq@healthcare.com',
    clinic: 'Mushtaq Medical Center',
  },
}

export function Profile() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  }

  return (
    <div className="ml-64 mt-16 p-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Patient Profile</h1>
        <p className="text-purple-200/60">View patient information and medical details</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/30">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{patientData.name}</CardTitle>
                  <CardDescription>Age {patientData.age}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-purple-200/60 mb-1">Medical Condition</p>
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {patientData.condition}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 shadow-lg shadow-teal-500/30">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Healthcare Provider</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-white">{patientData.healthcareProvider.name}</p>
                <p className="text-sm text-purple-200/60">{patientData.healthcareProvider.specialty}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-purple-200/80">
                  <Phone className="h-4 w-4" />
                  <span>{patientData.healthcareProvider.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-200/80">
                  <Mail className="h-4 w-4" />
                  <span>{patientData.healthcareProvider.email}</span>
                </div>
                <p className="text-purple-200/60">{patientData.healthcareProvider.clinic}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/30">
                  <Pill className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Medications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientData.medications.map((med, index) => (
                  <div key={index} className="rounded-xl border border-purple-500/20 bg-purple-900/20 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-white">{med.name}</p>
                        <p className="text-sm text-purple-200/60">{med.dosage}</p>
                      </div>
                      <Badge variant="outline">{med.frequency}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-500/30">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Emergency Contacts</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientData.emergencyContacts.map((contact, index) => (
                  <div key={index} className="rounded-xl border border-purple-500/20 bg-purple-900/20 p-4">
                    <p className="font-semibold text-white">{contact.name}</p>
                    <p className="text-sm text-purple-200/60 mb-2">{contact.relation}</p>
                    <div className="flex items-center gap-2 text-purple-200/80">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

