import { BlogArticle } from "./BlogPost";
import { RESTAURANT_GUIDE_EL, RESTAURANT_GUIDE_HE } from "@/data/restaurantWebsiteGuide";

export function RestaurantGuideEl() {
  return <BlogArticle article={RESTAURANT_GUIDE_EL} locale="el" />;
}

export function RestaurantGuideHe() {
  return <BlogArticle article={RESTAURANT_GUIDE_HE} locale="he" />;
}
