import React from "react";
import CampaignLayout from "../../components/campaigns/CampaignLayout";
import nariShakti from "../../assets/Narishakti.webp";

function NariShakti() {
  const campaignData = {
    title: "Nari Shakti",
    image: nariShakti,
    description: "A journey of standing with women, listening to them, and walking beside them as they discover their strength.",
    locations: [
    "Ambala Cantt",
      "Topkhana Basti (Ambala)",
      "Chandigarh",
      "Panchkula"
    ],
    stats: [
      { value: "1000+", label: "Women/Girls Empowered" },
      { value: "50+", label: "Programs" },
      { value: "20+", label: "Communities" },
      { value: "30+", label: "Success Stories" }
    ],
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nari Shakti Abhiyan – Drops of Change</h2>
            <p className="text-gray-600 mb-4">
              Nari Shakti Abhiyan is not just a campaign to us — it’s a journey that began with one story, one voice, and slowly grew into many. It’s about standing with women, listening to them and walking beside them as they discover their strength.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Health and Dignity</h3>
              <p className="text-gray-600">
                We met women quietly suffering from low energy — unaware that low hemoglobin could be the reason. So, we launched health camps and blood donation drives. Through 50+ programs, we’ve reached hundreds of women with health screenings and iron-rich nutrition awareness.
                <br />
                We also broke the silence around menstruation. By distributing free sanitary pads and holding open conversations, we witnessed something beautiful: women and girls smiling with relief, unburdened by shame.
                <br />
                <span className="italic text-sm text-gray-500">"Now, I don’t have to skip school during my periods,” said a 14-year-old participant.</span>
              </p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-rose-800 mb-2">Voices That Matter</h3>
              <p className="text-gray-600">
                In one village, a woman whispered her story of enduring domestic violence for years. It shook us — but it also gave us a mission. Since then, we've held community sessions in over 20+ localities, offering women a safe space to speak up, share, and heal. We’ve supported over 30+ survivors as they began new, independent chapters of their lives.
                <br />
                <span className="font-semibold">We tell every woman: <span className="italic">You are not alone. Your story matters.</span></span>
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Financial Freedom, Inner Strength</h3>
              <p className="text-gray-600">
                We met women with dreams — but no way to chase them. That’s why we started offering skill-building workshops: tailoring, handicrafts, computer basics, and more. Today, 1000+ women and girls have participated. Some have started home-run businesses, others have found jobs — and a sense of identity. The pride in their eyes? Unforgettable.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">Safety First</h3>
              <p className="text-gray-600">
                Safety isn’t optional — it’s essential. In schools and communities, we talk about personal safety, pepper spray, and self-defense. From schoolgirls learning how to say "no", to women confidently carrying safety tools, we’ve seen the shift. Their right to feel secure is now something they own, not ask for.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Together, We Rise</h3>
            <p className="text-gray-600 mb-2">
              We've created women’s circles where they laugh, cry, and grow — together. We’ve done school campaigns promoting gender sensitivity and emotional health. These spaces have now touched 20+ communities and formed lasting bonds of sisterhood. Here, there’s no judgment. Only upliftment.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#FF6F00] to-[#FF8F00] p-6 rounded-xl text-white">
            <h3 className="text-xl font-semibold mb-4">‘What We’ve Learned’</h3>
            <p className="mb-2">
              When a woman feels safe, strong, and truly heard, she begins to believe in herself. And that belief? It can change everything — for her, her family, and her community.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What Guides Us</h3>
            <ul className="list-disc ml-6 text-gray-600 mb-4">
              <li>That every woman deserves to stand on equal ground — to be seen, respected, and given the chance to thrive.</li>
              <li>That every voice belongs — no matter where she comes from, what she looks like, or how quietly she speaks.</li>
              <li>That every step — big or small — is worth celebrating. Because in the middle of struggle, there is also joy, courage, and light.</li>
            </ul>
            <p className="text-gray-600 mt-2 font-semibold">
              This is Nari Shakti Abhiyan.<br />
              Where strength is shared, voices rise together, and every drop becomes part of the change.
            </p>
          </div>
        </div>
      </>
    ),
    callToAction: "Support Women Empowerment"
  };

  return <CampaignLayout {...campaignData} />;
}

export default NariShakti;
