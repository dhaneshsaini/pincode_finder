import FindePincode from "./components/FindPincode";
import SearchBar from "./components/SearchBar";
import ShowPincode from "./components/ShowPincode";

export default function App() {
    return (
        <>
            <SearchBar />
            <main className="bg-[url('/bg.jpg')] bg-cover bg-center md:min-h-screen md:max-h-screen md:overflow-hidden w-full md:fixed">
                <div className="flex flex-col md:flex-row w-full">
                    <section className="flex-1">
                        <FindePincode />
                    </section>
                    <section className="flex-1">
                        <ShowPincode />
                    </section>
                </div>
            </main>
        </>
    )
}
