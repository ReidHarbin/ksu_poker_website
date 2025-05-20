import Logo from './images/logo.png'
import './styling/Home.css'

function Home() {
    return (
        <div className="Home">
            <img src={Logo} className='PokerLogo'></img>
            <div className='ClubName'> 
                KSU Poker Club
            </div>
        </div>
    );
}

export default Home;