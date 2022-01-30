import React from "react";
import styled from "styled-components";
import { AiOutlineDollar } from "react-icons/ai";

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  width: 50%;
  margin-left: auto;
  margin-right: auto;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  box-shadow: 5px 5px 44px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 5px 5px 44px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 44px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  padding-top: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
`;

const LongButton = styled.button`
  border: none;
  border-radius: 5px;
  margin: 10px 20px;

  margin-left: 10px;
  background-color: #fff;
  ${"" /* width: 45%; */}
  align-items: center;
  justify-content: center;
  display: flex;
  color: #b9a1fc;
  font-size: 12px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;

  align-items: center;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Footer = styled.div`
  display: flex;
  padding-left: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const GrayAddress = styled.p`
  color: #999;
  font-size: 12px;
`;

export default function Main(props) {
  const tipToAuthor = (author, index) => {
    console.log("tipToAuthor", author, index);
    let tipAmount = window.web3.utils.toWei("0.1", "Ether");
    props.decetragram.methods
      .tipImageOwner(index)
      .send({ from: props.account, value: tipAmount })
      .on("transactionHash", (hash) => {
        console.log("hash", hash);
        window.location.reload();
      });
  };

  return (
    <PostWrapper>
      {props.images.map((image, key) => (
        <Post key={key}>
          <Header>
            <ProfileImage
              src={`https://identicon-api.herokuapp.com/${Math.random()}/512?format=png`}
            />
            <GrayAddress>{image.author}</GrayAddress>
          </Header>
          <p class="text-center">
            <Image src={`https://ipfs.infura.io/ipfs/${image.hash}`} />
          </p>
          <Footer>
            <GrayAddress>
              Total Tips: {image.tipAmount.toString()}
              ETH
            </GrayAddress>
            <LongButton
              onClick={() => {
                tipToAuthor(image.author, key);
              }}
            >
              <AiOutlineDollar
                size={18}
                color="#b9a1fc"
                style={{
                  marginRight: "5px",
                }}
              />{" "}
              Tip to author (0.1 ETH)
            </LongButton>
          </Footer>
        </Post>
      ))}
    </PostWrapper>
  );
}