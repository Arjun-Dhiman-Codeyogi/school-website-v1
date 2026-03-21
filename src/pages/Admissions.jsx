// import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/three/ParticleBackground';
import { Progress } from '../components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../components/ui/resizable';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { useScrollFadeIn } from '../hooks/useGsapAnimations';
import { CalendarIcon, CheckCircle2 } from 'lucide-react';

// const steps = [
//   { step: 1, title: 'Personal Info', desc: 'Student and parent basic details' },
//   { step: 2, title: 'Academic Details', desc: 'Previous school and class information' },
//   { step: 3, title: 'Documents', desc: 'Upload required certificates' },
//   { step: 4, title: 'Verification', desc: 'OTP verification and confirmation' },
//   { step: 5, title: 'Fee Payment', desc: 'Complete admission fee payment' },
// ];

const fees = [
  { level: 'Middle (6-8)', annual: '100', admission: '2700' },
  { level: 'Secondary (9-10)', annual: '300', admission: '4000' },
  { level: 'Sr. Secondary (11-12)', annual: '500', admission: '6000' },
];

// const documents = [
//   'Birth Certificate',
//   'Previous School Transfer Certificate',
//   'Report Card / Mark Sheet',
//   'Passport Size Photographs (4)',
//   'Aadhaar Card (Student & Parents)',
//   'Address Proof',
//   'Medical Fitness Certificate',
//   'Caste Certificate (if applicable)',
// ];

const Admissions = () => {
  // const [currentStep, setCurrentStep] = useState(1);
  // const [dob, setDob] = useState(undefined);
  // const [otp, setOtp] = useState('');
  // const [formData, setFormData] = useState({
  //   studentName: '', parentName: '', email: '', phone: '',
  //   classApplied: '', previousSchool: '', gender: 'male',
  //   address: '', agreeTerms: false,
  // });

  const heroRef = useScrollFadeIn({ y: 30 });
  // const docsRef = useStaggerChildren({ stagger: 0.08 });
  // const progressValue = (currentStep / steps.length) * 100;

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <ParticleBackground color="#8b5cf6" />
        <div className="absolute inset-0 z-[1] bg-background/80" />
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Admissions <span className="gradient-text">2026-27</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Begin your child's journey towards a world of excellence, confidence, and achievement with us. Admissions are now open, and we welcome students to become part of a nurturing envirnonment that supports learning and overall development.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link to="/contact">Enquire Now</Link>
          </Button>
        </div>
      </section>



      {/* Fee Structure */}
      <section className="page-section bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">Fee <span className="gradient-text">Structure</span></h2>
          <Card className="mt-8">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class Level</TableHead>
                    <TableHead>Annual Fee (INR)</TableHead>
                    <TableHead>Admission Fee (INR)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fees.map((fee) => (
                    <TableRow key={fee.level}>
                      <TableCell className="font-medium">{fee.level}</TableCell>
                      <TableCell>{fee.annual}</TableCell>
                      <TableCell>{fee.admission}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                * Fees are subject to revision. Sibling discount of 10% available. Scholarships for meritorious students.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
