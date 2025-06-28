import { testGetData } from "../supabase-api/useSupabase";
import { getRankingFromAO20 } from "../ao-api/getRankingFromAO20";
const Index = () => {
  return (
    <div>
      <button
        onClick={async () => {
          console.log(await getRankingFromAO20());
        }}
      >
        Click here to test
      </button>
    </div>
  );
};

export default Index;
