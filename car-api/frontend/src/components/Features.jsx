import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Features() {
  const carAPIurl="https://carapi.app";
  const cardsData = [
    {
      src: "/assets/feature1.jpg", 
      title: "Data Sorting & Pagination",
      text: "Sorting through filters and pagination is available for easy access."
    },
    {
      src: "/assets/feature2.jpg",
      title: "Cars from 2015-2020",
      text: "Dataset consists of 17,662 cars manufactured in the US."
    },
    {
      src: "/assets/feature3.jpg",
      title: "CSV Dataset by CarAPI",
      text: "The CSV dataset is provided by CarAPI."
    },
    {
      src: "/assets/feature4.jpg",
      title: "API Key Authentication",
      text: "Our API uses unique API keys for secure authentication."
    }
  ];

  return (
    <div className="w-screen bg-black text-white xs:py-0 cs:py-0 py-16">
      <div className="w-3/4 mx-auto">
        <Row xs={1} sm={2} md={2} lg={4} className="g-6">
          {cardsData.map((card, idx) => (
            <Col key={idx} className="d-flex justify-content-center">
              <Card className="h-full w-full bg-transparent border-none hover:scale-105 transform transition-all duration-300 animate-bounce">
                <div className="relative h-60">
                  <Card.Img
                    variant="top"
                    src={card.src}
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      borderRadius: "0.3rem",
                      filter: "brightness(0.8)",
                    }}
                    className="w-full h-full"
                  />
                  <Card.Body className="absolute inset-0 flex items-center justify-center text-center z-10 p-4">
                    <div className="text-white">
                      <Card.Title className="text-2xl font-semibold mb-2 text-[#FFD700]">
                        {card.title}
                      </Card.Title>
                      <Card.Text className="text-lg">
                        {card.text}
                      </Card.Text>
                    </div>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Features;
