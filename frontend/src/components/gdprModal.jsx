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
import { Button } from './ui/button';

export default function gdprModal({ isOpen, openOnChange }) {
  return (
    <Dialog open={isOpen} openOnChange={openOnChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="modal-content">
        <DialogHeader>
          <DialogTitle>Personuppgiftspolicy för ChattApp</DialogTitle>
          <DialogDescription>
            <p>
              Vi samlar in och behandlar personuppgifter om dig, inklusive
              förnamn, efternamn, e-postadress, användarnamn (och adress och
              postnummer om det tillåts i registreringen). Syftet med denna
              behandling är följande:
            </p>

            <ul>
              <li>
                <strong>1. Skapa och administrera användarkonton</strong>: Vi
                samlar in personuppgifter, såsom användarnamn, förnamn och
                efternamn, för att skapa och identifiera användarkonton i vår
                chatt-applikation. Detta är nödvändigt för att tillhandahålla en
                säker och funktionell tjänst.
              </li>
              <li>
                <strong>2. Kommunicera med användare</strong>: Vi använder din
                e-postadress för att skicka viktig information, såsom
                kontobekräftelser, lösenordsåterställningar eller meddelanden
                relaterade till din aktivitet i applikationen. Detta görs för
                att säkerställa en god användarupplevelse och säkerhet.
              </li>
              <li>
                <strong>3. Förbättra och anpassa tjänsten</strong>:
                Personuppgifter, inklusive användarnamn och adress, kan användas
                för att förbättra applikationens funktionalitet och
                användarupplevelse. Detta kan innebära att ge geografiskt
                anpassad information eller visa lokalanpassade annonser baserat
                på din adress (om relevant).
              </li>
              <li>
                <strong>4. Säkerställa säkerhet och förhindra missbruk</strong>:
                Vi använder personuppgifter för att övervaka och hantera
                användarkonton, förhindra otillåten åtkomst och upprätthålla en
                säker miljö för alla användare.
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
              <strong>Rättslig grund och lagring:</strong> Vi följer gällande
              dataskyddslagstiftning vid all behandling av personuppgifter. Den
              rättsliga grunden för att behandla dina uppgifter är ditt
              samtycke. Du har rätt att när som helst återkalla ditt samtycke
              till behandlingen. Ett återkallande påverkar inte lagligheten av
              behandlingen innan samtycket återkallades. Dina uppgifter kommer
              att sparas i ett år efter senaste aktivitet.
            </p>

            <p>
              <strong>Delning av uppgifter:</strong> Vi delar inte dina
              personuppgifter med externa parter. Uppgifter som ditt
              användarnamn, förnamn, efternamn och e-postadress kan vara synliga
              för andra användare som är inloggade i systemet, i samband med att
              du använder vår chattfunktion. Vi delar inte dina uppgifter med
              externa företag, myndigheter eller tjänsteleverantörer och vi
              använder inte några personuppgiftsbiträden för att behandla dina
              personuppgifter.
            </p>

            <p>
              <strong>Delning vid rättsliga krav:</strong> Vi kan komma att dela
              dina personuppgifter med tredje part om vi är skyldiga att göra
              det enligt lag.
            </p>

            <p>
              <strong>Överföring till tredje land:</strong> Vi kommer inte att
              överföra dina uppgifter till ett land utanför EU. Alla
              personuppgifter som vi behandlar lagras och behandlas på servrar
              inom EU, och vi vidtar lämpliga säkerhetsåtgärder för att skydda
              dina uppgifter i enlighet med gällande lagstiftning.
            </p>

            <p>
              <strong>Personuppgiftsansvarig:</strong> Personuppgiftsansvarig är
              Kajsa, Christoffer och Peter på IT-högskolan. Du har rätt att
              kontakta oss om du vill ta del av information om de uppgifter vi
              har om dig, begära rättelse, överföring eller att vi begränsar
              behandlingen av dina uppgifter, eller om du vill göra invändningar
              eller begära radering.
            </p>

            <p>
              <strong>Kontaktinformation:</strong> Du kan kontakta oss på
              IT-högskolan för dessa ändamål. Du når vårt dataskyddsombud på:{' '}
              <a href="mailto:skyddsombud@iths.se">skyddsombud@iths.se</a>
            </p>

            <p>
              Om du har klagomål på vår behandling av dina personuppgifter har
              du rätt att inge klagomål till tillsynsmyndigheten
              Integritetsskyddsmyndigheten (IMY).
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
  );
}
