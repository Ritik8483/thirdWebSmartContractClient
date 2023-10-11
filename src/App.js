import { ConnectWallet } from "@thirdweb-dev/react";
import Home from "./components/Home";

export default function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

//Just make one folder client and In main folder write
// npx thirdweb@latest create --contract  => ./ => web3 => hardhat => crowdFunding => Empty contract
// in client side
//npx thirdweb@latest create --app  => y => ./ => vite => JS
//sepolia tesnet endpoint
// https://www.ankr.com/rpc/eth/eth_sepolia/
//cd web3 and npm run deploy
//pass contract address and localhost:port in creating api key and check whether you are getting contract address or not
//https://portal.thirdweb.com/react/react.usemetamask
//https://thirdweb.com/sepolia/0xe3261c3396fa9C05FfE5AaD9e225863cb670573e/code?environment=react
// https://www.bing.com/images/create/happy-cartoonish-lion-with-etherium-logo-in-hand/651cfe1f65ea4583b48757de0d9f842d?id=jICX2vaxrl64VTEwY4TaOg%3d%3d&view=detailv2&idpp=genimg&FORM=GCRIDP&ajaxhist=0&ajaxserp=0

// Docs
// https://github.com/thirdweb-dev/js/tree/main/packages/react
//https://portal.thirdweb.com/react
