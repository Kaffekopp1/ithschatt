// import { useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const navigate = useNavigate();
  const schema = z.object({
    username: z.string().min(3, 'Användarnamnet måste vara minst 3 tecken'),
    firstName: z.string().min(1, 'Fyll i ditt förnamn'),
    lastName: z.string().min(1, 'Fyll i ditt efternamn'),
    email: z.string().email('Epost-adressen måste ha ett giltigt format'),
    password: z.string().min(8, 'Lösenordet måste vara minst 8 tecken'),
    adress: z.string().max(50, 'Adressen får vara högst 50 tecken'),
    postalnr: z.string().max(5, 'Ogiltigt postnummer'),
    consent: z.boolean(),
  });
  const [errorMessage, setErrorMessage] = useState({});

  const onSubmit = async (data) => {
    if (!data.consent) {
      data.adress = '';
      data.postalnr = '';
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          adress: data.adress,
          postalnr: data.postalnr,
          consent: data.consent,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = error?.error || 'Ett okänt fel inträffade.';

        if (errorMessage.includes('username')) {
          setErrorMessage({
            field: 'username',
            message: 'Användarnamnet är redan registrerat.',
          });
        } else if (errorMessage.includes('email')) {
          setErrorMessage({
            field: 'email',
            message: 'E-postadressen är redan registrerad.',
          });
        }
        return;
      }

      const answer = await response.json();
      if (answer) {
        navigate('/login');
      }
    } catch (error) {
      alert('något gick fel');
      console.error('Error vid api fråga:', error);
    }
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      adress: '',
      postalnr: '',
      consent: false,
    },
  });

  const passwordValue = form.watch('password');

  return (
    <div className="flex justify-center min-h-[100vh]  ">
      <div className="mt-0.75 py-[60px] overflow-y-scroll max-h-[90vh] no-scrollbar p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Användarnamn</FormLabel>
                  <FormControl>
                    <Input placeholder="Användarnamn" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ditt namn är den mest grundläggande och kraftfulla delen av
                    din identitet. — Okänd
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Förnamn</FormLabel>
                  <FormControl>
                    <Input placeholder="Förnamn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Efternamn</FormLabel>
                  <FormControl>
                    <Input placeholder="Efternamn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Gata 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalnr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postnummer</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email-address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="du@exempel.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Vi kommer sälja denna email-address till spamföretag
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lösenord</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>
                    {passwordValue.length >= 8
                      ? 'Du har angivit lösenord: Hunter2'
                      : ''}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mr-3"
                    />
                  </FormControl>
                  <FormLabel>
                    Kryssa i rutan om du vill ha informationsbrev skickade till
                    din hemaddress.
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage.field === 'username' && (
              <p className="error">{errorMessage.message}</p>
            )}
            {errorMessage.field === 'email' && (
              <p className="error">{errorMessage.message}</p>
            )}
            {errorMessage.field === 'general' && (
              <p className="error">{errorMessage.message}</p>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mr-3">
                  Personuppgiftspolicy
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Personuppgiftspolicy för ChattApp</DialogTitle>
                  <DialogDescription>
                    <p>
                      Vi samlar in och behandlar personuppgifter om dig,
                      inklusive förnamn, efternamn, e-postadress, användarnamn
                      (och adress och postnummer om det tillåts i
                      registreringen). Syftet med denna behandling är följande:
                    </p>

                    <ul>
                      <li>
                        <strong>
                          1. Skapa och administrera användarkonton
                        </strong>
                        : Vi samlar in personuppgifter, såsom användarnamn,
                        förnamn och efternamn, för att skapa och identifiera
                        användarkonton i vår chatt-applikation. Detta är
                        nödvändigt för att tillhandahålla en säker och
                        funktionell tjänst.
                      </li>
                      <li>
                        <strong>2. Kommunicera med användare</strong>: Vi
                        använder din e-postadress för att skicka viktig
                        information, såsom kontobekräftelser,
                        lösenordsåterställningar eller meddelanden relaterade
                        till din aktivitet i applikationen. Detta görs för att
                        säkerställa en god användarupplevelse och säkerhet.
                      </li>
                      <li>
                        <strong>3. Förbättra och anpassa tjänsten</strong>:
                        Personuppgifter, inklusive användarnamn och adress, kan
                        användas för att förbättra applikationens funktionalitet
                        och användarupplevelse. Detta kan innebära att ge
                        geografiskt anpassad information eller visa
                        lokalanpassade annonser baserat på din adress (om
                        relevant).
                      </li>
                      <li>
                        <strong>
                          4. Säkerställa säkerhet och förhindra missbruk
                        </strong>
                        : Vi använder personuppgifter för att övervaka och
                        hantera användarkonton, förhindra otillåten åtkomst och
                        upprätthålla en säker miljö för alla användare.
                      </li>
                    </ul>

                    <p>
                      <strong>Insamling av uppgifter:</strong> Vi har fått dina
                      uppgifter när du skapade ditt användarkonto i vår
                      chatt-applikation. Du har själv registrerat ditt förnamn,
                      efternamn, e-postadress, användarnamn och eventuellt andra
                      uppgifter i samband med användningen av vår tjänst.
                    </p>

                    <p>
                      <strong>Rättslig grund och lagring:</strong> Vi följer
                      gällande dataskyddslagstiftning vid all behandling av
                      personuppgifter. Den rättsliga grunden för att behandla
                      dina uppgifter är ditt samtycke. Du har rätt att när som
                      helst återkalla ditt samtycke till behandlingen. Ett
                      återkallande påverkar inte lagligheten av behandlingen
                      innan samtycket återkallades. Dina uppgifter kommer att
                      sparas i ett år efter senaste aktivitet.
                    </p>

                    <p>
                      <strong>Delning av uppgifter:</strong> Vi delar inte dina
                      personuppgifter med externa parter. Uppgifter som ditt
                      användarnamn, förnamn, efternamn och e-postadress kan vara
                      synliga för andra användare som är inloggade i systemet, i
                      samband med att du använder vår chattfunktion. Vi delar
                      inte dina uppgifter med externa företag, myndigheter eller
                      tjänsteleverantörer och vi använder inte några
                      personuppgiftsbiträden för att behandla dina
                      personuppgifter.
                    </p>

                    <p>
                      <strong>Delning vid rättsliga krav:</strong> Vi kan komma
                      att dela dina personuppgifter med tredje part om vi är
                      skyldiga att göra det enligt lag.
                    </p>

                    <p>
                      <strong>Överföring till tredje land:</strong> Vi kommer
                      inte att överföra dina uppgifter till ett land utanför EU.
                      Alla personuppgifter som vi behandlar lagras och behandlas
                      på servrar inom EU, och vi vidtar lämpliga
                      säkerhetsåtgärder för att skydda dina uppgifter i enlighet
                      med gällande lagstiftning.
                    </p>

                    <p>
                      <strong>Personuppgiftsansvarig:</strong>{' '}
                      Personuppgiftsansvarig är Kajsa, Christoffer och Peter på
                      IT-högskolan. Du har rätt att kontakta oss om du vill ta
                      del av information om de uppgifter vi har om dig, begära
                      rättelse, överföring eller att vi begränsar behandlingen
                      av dina uppgifter, eller om du vill göra invändningar
                      eller begära radering.
                    </p>

                    <p>
                      <strong>Kontaktinformation:</strong> Du kan kontakta oss
                      på IT-högskolan för dessa ändamål. Du når vårt
                      dataskyddsombud på:{' '}
                      <a href="mailto:skyddsombud@iths.se">
                        skyddsombud@iths.se
                      </a>
                    </p>

                    <p>
                      Om du har klagomål på vår behandling av dina
                      personuppgifter har du rätt att inge klagomål till
                      tillsynsmyndigheten Integritetsskyddsmyndigheten (IMY).
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
