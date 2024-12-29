import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Features() {
  const cardsData = [
    {
        src: "/assets/feature1.jpg", 
        title: "Data Sorting & Pagination",
        text: "Efficient sorting and pagination to manage large datasets with ease."
      },
      {
        src: "/assets/feature2.jpg",
        title: "Cars from 2015-2020",
        text: "Access data for 17,662 cars spanning the years 2015 to 2020."
      },
      {
        src: "/assets/feature3.jpg",
        title: "CSV Downloads via CarApi",
        text: "Download CSV files with ease, powered by CarApi for quick data access."
      },
      {
        src: "/assets/feature4.jpg",
        title: "API Key Authentication",
        text: "Easy-to-use API with secure authentication via API keys for better security."
      }
  ];
  return (
    <div className="h-full w-full bg-black text-white">
      <Row xs={1} md={2} className="g-4">
        {cardsData.map((card, idx) => (
          <Col key={idx}>
            <Card className="h-60 w-3/4">
              <Card.Img variant="top" src={card.src} style={{
                  objectFit: "cover",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  filter: "brightness(0.9)",
                  borderRadius:"0.3rem",
                }} className="hover:brightness-0"/>
              <Card.Body style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  zIndex: 1,
                  color:"white",
                  opacity:1
                }}>
                <Card.Title className="text-2xl text-[#FFD700]">{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Features;
