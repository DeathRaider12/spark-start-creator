import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface Certificate {
    id: string
    courseTitle: string
    studentName: string
    completionDate: Date
    grade?: string
    instructor: string
}

export function CertificateCard({ certificate }: { certificate: Certificate }) {
    const downloadCertificate = async () => {
        // Implement certificate download logic
        console.log('Downloading certificate:', certificate.id)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Certificate of Completion</CardTitle>
                <CardDescription>{certificate.courseTitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="text-center space-y-2">
                        <p className="text-xl font-serif">{certificate.studentName}</p>
                        <p className="text-sm text-muted-foreground">
                            has successfully completed
                        </p>
                        <p className="text-lg font-medium">{certificate.courseTitle}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-medium">Completion Date</p>
                            <p className="text-muted-foreground">
                                {certificate.completionDate.toLocaleDateString()}
                            </p>
                        </div>
                        {certificate.grade && (
                            <div>
                                <p className="font-medium">Grade Achieved</p>
                                <p className="text-muted-foreground">{certificate.grade}</p>
                            </div>
                        )}
                        <div>
                            <p className="font-medium">Instructor</p>
                            <p className="text-muted-foreground">{certificate.instructor}</p>
                        </div>
                    </div>

                    <Button className="w-full" onClick={downloadCertificate}>
                        Download Certificate
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

import { useState } from "react"

export function Certificates() {
    const [certificates, setCertificates] = useState<Certificate[]>([])

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Certificates</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificates.map((certificate: Certificate) => (
                    <CertificateCard key={certificate.id} certificate={certificate} />
                ))}
            </div>
        </div>
    )
}
