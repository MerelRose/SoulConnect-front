//kan niet in de site tenzij de header word aangepast

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Voorwaarden() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isBottom, setIsBottom] = useState(false);

    const handleScroll = (e) => {
        const element = e.target;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        setScrollProgress(progress);
        if (scrollTop + element.clientHeight >= element.scrollHeight) {
            setIsBottom(true);
        } else {
            setIsBottom(false);
        }
        setScrollProgress(progress);
    };
    const getTodaysDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const todaysDate = getTodaysDate();
    return (
        <div className="bg-cover bg-scroll">
            <div
                className="border border-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 overflow-auto w-3/4 rounded-xl mx-auto"
                onScroll={handleScroll}
            >
                <div className="ml-4 text-white">
                    <h1 className="text-5xl text-center mt-20 mb-10">Algemene Voorwaarden</h1>
                    <h1 className='text-7xl text-center mt-5 mb-10'>SoulConnect</h1>
                    <h3 className="text-xl text-left">Laatst bijgewerkt: {todaysDate} </h3>
                    <h2 className="text-3xl mt-10 text-left">1. Definities</h2>
                    <h3 className="text-xl text-left">1.1. Website: De SoulConnect-datingsite, inclusief alle subdomeinen en mobiele applicaties.</h3>
                    <h3 className="text-xl text-left">1.2. Gebruiker: Iedere persoon die de website bezoekt, een account aanmaakt of gebruik maakt van de diensten.</h3>
                    <h3 className="text-xl text-left">1.3. Diensten: Alle functionaliteiten en services die via de website worden aangeboden.</h3>
                    <h3 className="text-xl text-left">1.4. Persoonsgegevens: Alle informatie over een geïdentificeerde of identificeerbare natuurlijke persoon, zoals gedefinieerd in de AVG.</h3>
                    <h2 className="text-3xl mt-10 text-left">2. Toepasselijkheid</h2>
                    <h3 className="text-xl text-left">2.1. Deze algemene voorwaarden zijn van toepassing op alle gebruikers van SoulConnect.</h3>
                    <h3 className="text-xl text-left">2.2. Door een account aan te maken en gebruik te maken van de diensten, stemt de gebruiker in met deze voorwaarden en onze <Link to="/Privacy" className="underline">Privacyverklaring</Link>.</h3>
                    <h3 className="text-3xl mt-10 text-left">3. Gebruikersaccount</h3>
                    <h3 className="text-xl text-left">3.1. Gebruikers dienen minimaal 18 jaar oud te zijn.</h3>
                    <h3 className="text-xl text-left">3.2. Gebruikers verklaren dat de verstrekte informatie juist en volledig is.</h3>
                    <h3 className="text-xl text-left">3.3. Gebruikers zijn verantwoordelijk voor het vertrouwelijk houden van hun inloggegevens.</h3>
                    <h3 className="text-xl text-left">3.4. Gebruikers kunnen hun gegevens op elk moment inzien, corrigeren of verwijderen via hun accountinstellingen.</h3>
                    <h2 className="text-3xl mt-10 text-left">4. Gebruik van persoonsgegevens</h2>
                    <h3 className="text-xl text-left">4.1. Verwerkingsdoelen: SoulConnect verwerkt persoonsgegevens uitsluitend voor de volgende doeleinden:</h3>
                    <h3 className="text-xl text-left">- Het aanmaken en beheren van gebruikersaccounts.</h3>
                    <h3 className="text-xl text-left">- Het faciliteren van matches en communicatie tussen gebruikers.</h3>
                    <h3 className="text-xl text-left">- Het verbeteren van de diensten, inclusief personalisatie.</h3>
                    <h3 className="text-xl text-left">- Het naleven van wettelijke verplichtingen.</h3>
                    <h3 className="text-xl text-left">4.2. Grondslag voor verwerking: De verwerking van persoonsgegevens vindt plaats op basis van toestemming van de gebruiker en/of de uitvoering van een overeenkomst.</h3>
                    <h3 className="text-xl text-left">4.3. Rechten van gebruikers: Gebruikers hebben de volgende rechten onder de AVG:</h3>
                    <h3 className="text-xl text-left">- Recht op inzage: Gebruikers kunnen een kopie van hun persoonsgegevens opvragen.</h3>
                    <h3 className="text-xl text-left">- Recht op rectificatie: Gebruikers kunnen onjuiste gegevens corrigeren.</h3>
                    <h3 className="text-xl text-left">- Recht op verwijdering: Gebruikers kunnen hun gegevens laten verwijderen ("recht om vergeten te worden").</h3>
                    <h3 className="text-xl text-left">- Recht op beperking: Gebruikers kunnen vragen om de verwerking van hun gegevens te beperken.</h3>
                    <h3 className="text-xl text-left">- Recht op gegevensoverdraagbaarheid: Gebruikers kunnen hun gegevens in een gestructureerd, gangbaar formaat ontvangen.</h3>
                    <h3 className="text-xl text-left">- Recht van bezwaar: Gebruikers kunnen bezwaar maken tegen de verwerking van hun gegevens.</h3>
                    <h3 className="text-xl text-left">4.4. Contact voor privacyvragen: Gebruikers kunnen privacy-gerelateerde vragen of verzoeken indienen via <a href="mailto:soulconnect.examen@gmail.com" className="underline">soulconnect.examen@gmail.com</a>.</h3>
                    <h2 className="text-3xl mt-10 text-left">5. Beveiliging van gegevens</h2>
                    <h3 className="text-xl text-left">5.1. SoulConnect neemt passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, ongeoorloofde toegang, en andere vormen van onrechtmatige verwerking.</h3>
                    <h3 className="text-xl text-left">5.2. In geval van een datalek dat waarschijnlijk een hoog risico oplevert voor de rechten van gebruikers, zal SoulConnect de betrokkenen en de autoriteiten onmiddellijk informeren.</h3>
                    <h2 className="text-3xl mt-10 text-left">6. Verwerkers en derden</h2>
                    <h3 className="text-xl text-left">6.1. Persoonsgegevens worden niet gedeeld met derden, tenzij:</h3>
                    <h3 className="text-xl text-left">- Dit noodzakelijk is voor de levering van de diensten (bijvoorbeeld hostingproviders).</h3>
                    <h3 className="text-xl text-left">- Dit wettelijk verplicht is.</h3>
                    <h3 className="text-xl text-left">- De gebruiker expliciete toestemming heeft gegeven.</h3>
                    <h3 className="text-xl text-left">6.2. SoulConnect heeft verwerkersovereenkomsten met derden die persoonsgegevens verwerken namens SoulConnect, in overeenstemming met de AVG.</h3>
                    <h2 className="text-3xl mt-10 text-left">7. Bewaartermijn</h2>
                    <h3 className="text-xl text-left">7.1. Persoonsgegevens worden bewaard zolang dat noodzakelijk is voor de doeleinden waarvoor ze zijn verzameld of zolang als wettelijk vereist.</h3>
                    <h3 className="text-xl text-left">7.2. Na beëindiging van het account worden persoonsgegevens binnen 56 dagen verwijderd, tenzij wettelijke verplichtingen een langere bewaartermijn vereisen.</h3>
                    <h2 className="text-3xl mt-10 text-left">8. Cookies</h2>
                    <h3 className="text-xl text-left">8.1. SoulConnect gebruikt cookies en vergelijkbare technologieën. Details hierover staan beschreven in onze <Link to="/Cookie" className="underline">Cookieverklaring</Link>.</h3>
                    <h3 className="text-xl text-left">8.2. Gebruikers kunnen hun cookievoorkeuren instellen bij het eerste bezoek aan de website.</h3>
                    <h2 className="text-3xl mt-10 text-left">9. Wijzigingen</h2>
                    <h3 className="text-xl text-left">9.1. SoulConnect behoudt zich het recht voor om deze voorwaarden te wijzigen.</h3>
                    <h3 className="text-xl text-left">9.2. Wijzigingen worden aangekondigd via de website. Voortgezet gebruik van de diensten na wijziging impliceert acceptatie.</h3>
                    <h2 className="text-3xl mt-10 text-left">10. Toepasselijk recht</h2>
                    <h3 className="text-xl text-left">10.1. Op deze voorwaarden is het recht van Nederland van toepassing.</h3>
                    <h3 className="text-xl text-left">10.2. Geschillen worden voorgelegd aan de bevoegde rechter in Zwolle.</h3>
                </div>
                <div className="sticky bottom-0 left-0 w-full h-1/6 bg-white">
                    <div className="sticky relative w-full h-3 bg-gray-200">
                        <div
                            className="bg-blue-500 text-white font-bold items-center justify-center rounded flex inline-block mt-5 w-2/5 h-3/5 text-center m-auto"
                            style={{ width: `${scrollProgress}%` }}
                        ></div>
                    </div>
                    <Link
                        to="/Register"
                        className={`bg-blue-500 text-white font-bold items-center justify-center rounded flex inline-block mt-5 w-2/5 h-3/5 text-center m-auto ${!isBottom ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={(e) => !isBottom && e.preventDefault()}
                    >
                        Accept
                    </Link>
                </div>
            </div>
        </div>
    );
}