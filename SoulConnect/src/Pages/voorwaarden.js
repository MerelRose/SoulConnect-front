import { Link } from "react-router-dom";

export default function voorwaarden (){
    return (
        <div className="border border-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 w-3/5 rounded-xl mx-auto">
            <div className="h-4/5">
            <h1 className="text-5xl text-center mt-20 mb-10">Voorwaarden</h1>
            <div className="text-lg text-center">
                <p>
                1. Definities
                1.1. Website: De SoulConnect-datingsite, inclusief alle subdomeinen en mobiele applicaties.
                1.2. Gebruiker: Iedere persoon die de website bezoekt, een account aanmaakt of gebruik maakt van de diensten.
                1.3. Diensten: Alle functionaliteiten en services die via de website worden aangeboden, zoals profielen aanmaken, berichten versturen, en matches zoeken.
                </p>
                <p>
                2. Toepasselijkheid
                2.1. Deze algemene voorwaarden zijn van toepassing op alle gebruikers van SoulConnect.
                2.2. Door het aanmaken van een account en gebruik te maken van de diensten, stemt de gebruiker in met deze voorwaarden.
                </p>
                <p>
                3. Gebruikersaccount
                3.1. Gebruikers dienen minimaal 18 jaar oud te zijn.
                3.2. Het is verboden om een vals profiel aan te maken of zich voor te doen als een ander persoon.
                3.3. Gebruikers zijn verantwoordelijk voor het vertrouwelijk houden van hun inloggegevens.
                </p>
                <p>
                4. Gebruik van de diensten
                4.1. Het is verboden om content te plaatsen die:
                </p>
                <p>
                Beledigend, discriminerend, of pornografisch van aard is.
                Schending vormt van auteursrechten of andere rechten van derden.
                4.2. SoulConnect behoudt zich het recht voor om accounts of content te verwijderen die in strijd zijn met deze voorwaarden.
                </p>
                <p>
                5. Betalingen
                5.1. Bepaalde functies van SoulConnect kunnen alleen worden gebruikt via een betaald abonnement.
                5.2. Betalingen zijn niet restitueerbaar, tenzij wettelijk verplicht.
                </p>
                <p>
                6. Privacy en gegevensbescherming
                6.1. SoulConnect respecteert de privacy van gebruikers en handelt volgens de geldende privacywetgeving.
                6.2. Meer informatie over de verwerking van persoonsgegevens staat in onze [Privacyverklaring](link naar privacyverklaring).
                </p>
                <p>
                7. Aansprakelijkheid
                7.1. SoulConnect biedt geen garanties voor het vinden van een match of het succes van relaties.
                7.2. SoulConnect is niet aansprakelijk voor schade voortvloeiend uit het gebruik van de website, behalve in gevallen van opzet of grove nalatigheid.
                </p>
                <p>
                8. Beëindiging
                8.1. Gebruikers kunnen hun account op elk moment beëindigen.
                8.2. SoulConnect behoudt zich het recht voor om accounts te beëindigen bij misbruik of schending van deze voorwaarden.
                </p>
                <p>
                9. Wijzigingen
                9.1. SoulConnect behoudt zich het recht voor om deze voorwaarden te wijzigen.
                9.2. Wijzigingen worden aangekondigd via de website. Voortgezet gebruik van de diensten na wijziging impliceert acceptatie.
                </p>
                <p>
                    10. Toepasselijk recht
                    10.1. Op deze voorwaarden is het recht van [Land] van toepassing.
                    10.2. Geschillen worden voorgelegd aan de bevoegde rechter in [Plaats].
                </p>
                </div>
            <div className="h-1/5 mt-5">
            <Link to="/Register" className='mx-auto bg-blue-500 hover:bg-blue-700 text-white w-80 font-bold py-2 px-4 rounded-md absolute -translate-x-1/2 left-1/2 text-center'>accept</Link>
            </div>
            </div>
        </div>
        )};