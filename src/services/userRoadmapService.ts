
import { supabase } from "@/integrations/supabase/client";
import { RoadmapData } from "@/components/Roadmap";

export interface UserRoadmap {
  id: string;
  title: string;
  language: string;
  content: RoadmapData;
  created_at: string;
}

export const saveRoadmap = async (
  title: string,
  language: string,
  content: RoadmapData
): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from("user_roadmaps")
      .insert({
        title,
        language,
        content: content as any, // Cast to any to resolve type issues
        user_id: supabase.auth.getUser().then(res => res.data.user?.id) // Get the current user's ID
      })
      .select("id")
      .single();

    if (error) throw error;
    return data.id;
  } catch (error: any) {
    console.error("Error saving roadmap:", error.message);
    return null;
  }
};

export const getUserRoadmaps = async (): Promise<UserRoadmap[]> => {
  try {
    const { data, error } = await supabase
      .from("user_roadmaps")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as unknown as UserRoadmap[]; // Use type assertion to resolve type issues
  } catch (error: any) {
    console.error("Error fetching roadmaps:", error.message);
    return [];
  }
};

export const getRoadmapById = async (id: string): Promise<UserRoadmap | null> => {
  try {
    const { data, error } = await supabase
      .from("user_roadmaps")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as unknown as UserRoadmap; // Use type assertion to resolve type issues
  } catch (error: any) {
    console.error("Error fetching roadmap:", error.message);
    return null;
  }
};

export const deleteRoadmap = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("user_roadmaps")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error("Error deleting roadmap:", error.message);
    return false;
  }
};
