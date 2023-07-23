import { count } from "console";

const getPredictedAge = async (name: string) => {
  const result = await fetch(`https://api.agify.io?name=${name}`);
  return result.json();
};

const getPredictedGender = async (name: string) => {
  const result = await fetch(`https://api.genderize.io?name=${name}`);
  return result.json();
};

const getPredictedCountry = async (name: string) => {
  const result = await fetch(`https://api.nationalize.io?name=${name}`);
  return result.json();
};

interface Params {
  params: { name: string };
}

export default async function Page({ params }: Params) {
  const ageData = getPredictedAge(params.name);
  const genderData = getPredictedGender(params.name);
  const countryData = getPredictedCountry(params.name);
  const [age, gender, country] = await Promise.all([
    ageData,
    genderData,
    countryData,
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Personal Info
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Age: {age?.age}
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Gender: {gender?.gender}
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Nationality: {country?.country[0]?.country_id}
        </div>
      </div>
    </main>
  );
}
