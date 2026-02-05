import { Link } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

const Success = () => {
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col>
            <Card className="shadow border-0 text-center p-4">
              <CardBody>
                <CardTitle tag="h3" className="mb-3">
                  İşlem Başarılı 🎉
                </CardTitle>

                <CardText className="text-muted mb-4">
                  Yaptığınız işlem sorunsuz bir şekilde tamamlandı. Devam etmek
                  için aşağıdaki butonu kullanabilirsiniz.
                </CardText>

                <Link to="/">
                  <Button color="success" size="lg" block>
                    Ana Sayfaya Dön
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Success;
