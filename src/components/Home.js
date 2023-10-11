import {
  ConnectWallet,
  useContract,
  useAddress,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import { ethers } from "ethers";

const Home = () => {
  const [startCampaign, setStartCampaign] = useState(false);
  const [fundCampaign, setFundCampaign] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [inputValues, setInputValues] = useState({
    name: "",
    title: "",
    story: "",
    goal: "",
    date: "",
    image: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((last) => ({
      ...last,
      [name]: value,
    }));
  };

  const address = useAddress();
  const { contract, isLoading: contractIsLoading } = useContract(
    "0x45ec4B88456dD62006C42D27027F047145399831"
  );
  const { data: donatorData } = useContractRead(contract, "getDonators", [0]);
  console.log("donatorData", donatorData);

  const { mutateAsync: donateToCampaign } = useContractWrite(
    contract,
    "donateToCampaign"
  );

  const {
    mutateAsync: createCampaign,
    isLoading,
    isSuccess,
  } = useContractWrite(contract, "createCampaign");

  const { data: campaignsList, isLoading: campaignListLoading } =
    useContractRead(contract, "getCampaigns");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createCampaign({
        args: [
          address,
          //   inputValues.name,
          inputValues.title,
          inputValues.story,
          ethers.utils.parseUnits(inputValues.goal, 18),
          new Date(inputValues.date).getTime(),
          inputValues.image,
        ],
      });
      if (data?.receipt?.status) {
        setInputValues({
          name: "",
          title: "",
          story: "",
          goal: "",
          date: "",
          image: "",
        });
      }
    } catch (err) {
      console.error("contract call failure", err);
    }
    console.log("inputValues", inputValues);
  };

  const handleSubmitFund = async (item, index) => {
    console.log("item", item);
    if (!fundAmount.length) return;
    try {
      const data = await donateToCampaign({
        args: [index],
        value: ethers.utils.parseEther(fundAmount),
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  console.log("contract", contract);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <ConnectWallet
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />
        {address && (
          <button onClick={() => setStartCampaign(!startCampaign)}>
            {startCampaign ? "Close Form" : "Start a Campaign"}
          </button>
        )}
        {startCampaign && (
          <form
            style={{
              padding: "20px",
              width: "30%",
              borderRadius: "8px",
              backgroundColor: "#ccc",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
            onSubmit={handleSubmit}
          >
            <input
              value={inputValues.name}
              name="name"
              onChange={handleChange}
              placeholder="Your Name"
              type="text"
            />
            <input
              value={inputValues.title}
              name="title"
              onChange={handleChange}
              placeholder="Campaign Title"
              type="text"
            />
            <input
              value={inputValues.story}
              name="story"
              onChange={handleChange}
              placeholder="Story"
              type="text"
            />
            <input
              value={inputValues.goal}
              name="goal"
              onChange={handleChange}
              placeholder="Goal"
              type="number"
            />
            <input
              value={inputValues.date}
              name="date"
              onChange={handleChange}
              placeholder="End Date"
              type="date"
            />
            <input
              value={inputValues.image}
              name="image"
              onChange={handleChange}
              placeholder="Place image URL of your campaign"
              type="url"
            />
            <button disabled={isLoading} type="submit">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {campaignListLoading ? (
            <h4>Loading Campaigns...</h4>
          ) : (
            campaignsList?.map((item, index) => {
              // const remainingDays=
              const targetValue = item.target._hex;
              const targetBigNumber = ethers.BigNumber.from(targetValue);
              const targetEtherValue =
                ethers.utils.formatEther(targetBigNumber);

              const amountCollectedValue = item.amountCollected._hex;
              const amountCollectedBigNumber =
                ethers.BigNumber.from(amountCollectedValue);
              const amountCollectedEtherValue = ethers.utils.formatEther(
                amountCollectedBigNumber
              );

              const deadlineInNumber = item.deadline.toNumber();
              const difference =
                new Date(deadlineInNumber).getTime() - Date.now();
              const remainingDays = difference / (1000 * 3600 * 24);
              const daysInNumber = Math.ceil(remainingDays);

              const mapp = item?.donations?.map((items) => {
                console.log(items);
                const targetValue = items;
                const targetBigNumber = ethers.BigNumber.from(targetValue);
                const targetEtherValue =
                  ethers.utils.formatEther(targetBigNumber);
                console.log("targetEtherValue", targetEtherValue);
                return targetEtherValue;
              });
              console.log(item);
              // console.log("mapp",mapp.reduce((x,y)=> x + y, 10);
              return (
                <div
                  style={{
                    backgroundColor: "cyan",
                    border: "1px solid #ccc",
                    padding: "10px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt="campaign"
                    style={{
                      objectFit: "cover",
                      height: "90px",
                      textAlign: "center",
                    }}
                  />
                  <p>Name : {item.title}</p>
                  <p>Owner Address : {item.owner}</p>
                  <p>Description : {item.description}</p>
                  <p>Target Amount : {targetEtherValue}ETH</p>
                  <p>Amount Collected : {amountCollectedEtherValue}ETH</p>
                  <p>Remaining Days : {daysInNumber}</p>
                  <h5 style={{ margin: "0" }}>Donators</h5>
                  {item?.donators?.map((it, ind) => (
                    <div>
                      <h6>
                        {ind + 1}. {it}
                      </h6>
                    </div>
                  ))}
                  {fundCampaign && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        width: "100%",
                      }}
                    >
                      <input
                        value={fundAmount}
                        type="number"
                        onChange={(e) => setFundAmount(e.target.value)}
                        placeholder="Enter fund amount"
                      />
                      <button
                        onClick={() => handleSubmitFund(item, index)}
                        type="submit"
                      >
                        Fund Campaign
                      </button>
                    </div>
                  )}
                  {!fundCampaign && (
                    <button onClick={() => setFundCampaign(true)}>
                      Fund Campaign
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
