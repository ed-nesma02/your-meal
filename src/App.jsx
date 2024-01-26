import { Catalog } from "./components/Catalog/Catalog";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ModalDelivery } from "./components/ModalDelivery/ModalDelivery";
import { ModalInfo } from "./components/ModalInfo/ModalInfo";
import { Navigation } from "./components/Navigation/Navigation";

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Navigation />
        <Catalog />
      </main>
      <Footer />
      <ModalDelivery />
      <ModalInfo />
    </>
  );
};
