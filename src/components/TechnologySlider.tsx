import { InfiniteSlider } from "@/components/ui/infinite-slider";

// Define technology data with names and image paths
const technologies = [
  { name: "HTML", image: "/assets/technologies/html.svg" },
  { name: "CSS", image: "/assets/technologies/css.svg" },
  { name: "Tailwind CSS", image: "/assets/technologies/tailwindcss.svg" },
  { name: "JavaScript", image: "/assets/technologies/javascript.svg" },
  { name: "TypeScript", image: "/assets/technologies/typescript.svg" },
  { name: "PHP", image: "/assets/technologies/php.svg" },
  { name: "Laravel", image: "/assets/technologies/laravel.svg" },
  { name: "Framer", image: "/assets/technologies/framer.svg" },
  { name: "React", image: "/assets/technologies/react.svg" },
  { name: "Angular", image: "/assets/technologies/angular.svg" },
  { name: "Vue.js", image: "/assets/technologies/vue.svg" },
  { name: "Node.js", image: "/assets/technologies/node.svg" },
  { name: "Express", image: "/assets/technologies/express.svg" },
  { name: "Nest.js", image: "/assets/technologies/nest.svg" },
  { name: "MongoDB", image: "/assets/technologies/mongodb.svg" },
  { name: "SQL", image: "/assets/technologies/sql.svg" },
  { name: "PostgreSQL", image: "/assets/technologies/postgresql.svg" },
  { name: "Docker", image: "/assets/technologies/docker.svg" },
  { name: "AWS", image: "/assets/technologies/aws.svg" },
  { name: "WordPress", image: "/assets/technologies/wordpress.svg" },
  { name: "WooCommerce", image: "/assets/technologies/woocommerce.svg" },
];

function TechnologySlider() {
  return (
    <InfiniteSlider gap={24} reverse className="w-full h-full bg-brand-black py-12 overflow-hidden">
      {technologies.map((tech, index) => (
        <div key={index} className="flex flex-col items-center mx-6">
          <img 
            src={tech.image} 
            alt={`${tech.name} logo`} 
            className="h-[80px] w-auto mb-3" 
          />
          <span className="text-brand-white font-medium font-tertiary text-sm">{tech.name}</span>
        </div>
      ))}
    </InfiniteSlider>
  );
}

export default TechnologySlider;