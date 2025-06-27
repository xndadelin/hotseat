"use client";

  import { useEffect, useState } from "react";
  import SignIn from "@/lib/signin";
  import getUser from "@/hooks/getUser";
  import Loading from "@/components/Loading";
  import { useRouter } from "next/navigation";
  import { Input } from "@/components/ui/input";

  declare global {
    interface Window {
      VANTA?: any;
      THREE?: any;
    }
  }

  const hc_links = `
          https://hackclub.com/stickers/macintosh.svg
          https://hackclub.com/stickers/2020_progress.png
          https://hackclub.com/stickers/enjoy.svg
          https://hackclub.com/stickers/2016_hack_camp.svg
          https://hackclub.com/stickers/2018_holidays.svg
          https://hackclub.com/stickers/2020_progress.png
          https://hackclub.com/stickers/2020_storm_the_hack.png
          https://hackclub.com/stickers/2021_design_awards.png
          https://hackclub.com/stickers/2023_OnBoard_hatching_orpheus.png
          https://hackclub.com/stickers/AI_safety_campfire.png
          https://hackclub.com/stickers/AI_safety_meme.png
          https://hackclub.com/stickers/Blot.png
          https://hackclub.com/stickers/FIRST_co-branded_no_ears_sticker.png
          https://hackclub.com/stickers/HackHackClub.png
          https://hackclub.com/stickers/I_❤️_HC.png
          https://hackclub.com/stickers/In-N-Out.png
          https://hackclub.com/stickers/MRT.png
          https://hackclub.com/stickers/OnBoard_holographic_sticker.png
          https://hackclub.com/stickers/Rummage.png
          https://hackclub.com/stickers/adobe.svg
          https://hackclub.com/stickers/airlines.png
          https://hackclub.com/stickers/all_fun_javascript.svg
          https://hackclub.com/stickers/anxiety.png
          https://hackclub.com/stickers/apocalypse.png
          https://hackclub.com/stickers/arcade.png
          https://hackclub.com/stickers/assemble.svg
          https://hackclub.com/stickers/black_lives_matter.svg
          https://hackclub.com/stickers/bottle_caps.png
          https://hackclub.com/stickers/burst.png
          https://hackclub.com/stickers/drake.svg
          https://hackclub.com/stickers/emergency_meeting.svg
          https://hackclub.com/stickers/enjoy.svg
          https://hackclub.com/stickers/epoch.png
          https://hackclub.com/stickers/epoch_among_us.png
          https://hackclub.com/stickers/epoch_bubbly.png
          https://hackclub.com/stickers/epoch_h.png
          https://hackclub.com/stickers/find out.png
          https://hackclub.com/stickers/game_lab.png
          https://hackclub.com/stickers/game_lab_flask.png
          https://hackclub.com/stickers/grab.png
          https://hackclub.com/stickers/hack-club-anime.png
          https://hackclub.com/stickers/hack_club_HQ.png
          https://hackclub.com/stickers/hack_in_the_club.svg
          https://hackclub.com/stickers/hack_ok_please.png
          https://hackclub.com/stickers/hack_strikes_back.svg
          https://hackclub.com/stickers/hack_to_the_future.svg
          https://hackclub.com/stickers/hackers,_assemble!.png
          https://hackclub.com/stickers/hacky_new_year.png
          https://hackclub.com/stickers/hcb.png
          https://hackclub.com/stickers/hcb_(dark).png
          https://hackclub.com/stickers/hcb_pumpkin.png
          https://hackclub.com/stickers/hcb_sticker_sheet_1.png
          https://hackclub.com/stickers/hcb_sticker_sheet_2.png
          https://hackclub.com/stickers/horizon_computer.png
          https://hackclub.com/stickers/horizon_patch.png
          https://hackclub.com/stickers/horse.png
          https://hackclub.com/stickers/inside.png
          https://hackclub.com/stickers/jetlag.png
          https://hackclub.com/stickers/jurassic_hack.png
          https://hackclub.com/stickers/log_on.png
          https://hackclub.com/stickers/logo.png
          https://hackclub.com/stickers/m_a_s_h.png
          https://hackclub.com/stickers/macintosh.svg
          https://hackclub.com/stickers/mo’ parts mo’ problems.png
          https://hackclub.com/stickers/nasa.svg
          https://hackclub.com/stickers/nest_hat_orpheus.png
          https://hackclub.com/stickers/nest_hatched_smolpheus.png
          https://hackclub.com/stickers/orpheus-having-boba.png
          https://hackclub.com/stickers/orpheus-skateboarding-PCB.png
          https://hackclub.com/stickers/orpheus_flag.svg
          https://hackclub.com/stickers/orpheus_goes_to_FIRST_robotics.png
          https://hackclub.com/stickers/orpheus_with_duck.png
          https://hackclub.com/stickers/orphmoji_peefest.png
          https://hackclub.com/stickers/orphmoji_scared.png
          https://hackclub.com/stickers/orphmoji_yippee.png
          https://hackclub.com/stickers/pride.svg
          https://hackclub.com/stickers/raycast.png
          https://hackclub.com/stickers/riveter.svg
          https://hackclub.com/stickers/semicolon.svg
          https://hackclub.com/stickers/ship.png
          https://hackclub.com/stickers/sinerider_blue.png
          https://hackclub.com/stickers/sinerider_pink.png
          https://hackclub.com/stickers/single neuron activated.png
          https://hackclub.com/stickers/skullpup.png
          https://hackclub.com/stickers/skullpup_boba.png
          https://hackclub.com/stickers/skullpup_pixel.png
          https://hackclub.com/stickers/sledding.png
          https://hackclub.com/stickers/some_assembly_required.png
          https://hackclub.com/stickers/sprig.svg
          https://hackclub.com/stickers/sprig_holographic.png
          https://hackclub.com/stickers/stranger_hacks.png
          https://hackclub.com/stickers/summer_of_making.svg
          https://hackclub.com/stickers/swiss_miss.png
          https://hackclub.com/stickers/the-bin.png
          https://hackclub.com/stickers/the_trail_sticker_sheet.png
          https://hackclub.com/stickers/tiktok.svg
          https://hackclub.com/stickers/tootsie_roll.png
          https://hackclub.com/stickers/undertale.svg
          https://hackclub.com/stickers/valorant.png
          https://hackclub.com/stickers/valorant_vertical.svg
          https://hackclub.com/stickers/zephyr.svg`.split("\n").map(s => s.trim()).filter(Boolean);

  const randomSticker = hc_links[Math.floor(Math.random() * hc_links.length)];

  export default function Home() {
    const [name, setName] = useState("");
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      async function fetchUser() {
        const userData = await getUser();
        setUser(userData);
        setLoading(false);
      }
      fetchUser();
    }, []);

    useEffect(() => {
      if (!loading && user) {
        router.replace("/play");
      }
    }, [loading, user, router]);

    if (loading) return <Loading />;
    if (user) return null;

    return (
      <main className="min-h-screen flex flex-col items-center justify-center relative">
        <img src={randomSticker} alt="Hack Club Sticker" className="w-32 h-32 object-contain z-10 relative" />
        <h1 className="text-4xl font-bold mt-10 mb-6 z-10 relative">Hello!</h1>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter" && name.trim().length > 0) {
              await SignIn(name.trim());
            }
          }}
          placeholder="Type your name..."
          autoFocus
          autoComplete="off"
          spellCheck="false"
          required
          className="w-64 text-lg bg-white dark:bg-zinc-900 border border-orange-500 shadow-lg placeholder-orange-400 focus:border-orange-600 focus:ring-2 focus:ring-orange-300 z-10 relative"
        />
      </main>
    );
  }
