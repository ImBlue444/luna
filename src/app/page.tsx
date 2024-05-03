import OrdersTable from "@/components/tables/OrdersTable";
import Hero from "@/components/Hero/Hero";
export default function Home() {
  return (
    <main>
      <div className="flex justify-center flex-col">
        <Hero isSubSection={false} title="Dashboard" />
        <OrdersTable />
      </div>
    </main>
  );
}
