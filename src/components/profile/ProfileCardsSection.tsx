import {
  AwardsCard,
  BlogCard,
  CalendarCard,
  CertificationsCard,
  GitHubCard,
  HomelabCard,
  LocationCard,
  ProfileImageCard,
  ProjectsCard,
  SkillsCard,
  SpotifyCard,
  WakatimeCard,
} from "./cards";
import { TunnelCard } from "./cards/TunnelCard";

export function ProfileCardsSection() {
  const cards = [
    ProfileImageCard,
    GitHubCard,
    AwardsCard,
    CertificationsCard,
    BlogCard,
    ProjectsCard,
    SkillsCard,
    WakatimeCard,
    SpotifyCard,
    HomelabCard,
    CalendarCard,
    LocationCard,
    TunnelCard,
  ];

  return (
    <div className="profile-card-grid grid auto-rows-auto grid-cols-4 gap-2 sm:grid-cols-12">
      {cards.map((Card, index) => (
        <Card key={index} order={index} />
      ))}
    </div>
  );
}
