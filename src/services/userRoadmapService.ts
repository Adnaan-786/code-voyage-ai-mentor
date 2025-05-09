
import { supabase } from "@/integrations/supabase/client";
import { RoadmapData } from "@/components/Roadmap";
import { Json } from "@/integrations/supabase/types";

export interface UserRoadmap {
  id: string;
  title: string;
  language: string;
  content: RoadmapData;
  created_at: string;
  user_id?: string;
}

export const saveRoadmap = async (
  title: string,
  language: string,
  content: RoadmapData
): Promise<string | null> => {
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    
    if (!userId) {
      throw new Error("User is not authenticated");
    }

    const { data, error } = await supabase
      .from("roadmaps")
      .insert({
        title,
        language,
        content: content as unknown as Json,
        user_id: userId
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
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    
    if (!userId) {
      throw new Error("User is not authenticated");
    }
    
    const { data, error } = await supabase
      .from("roadmaps")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as unknown as UserRoadmap[];
  } catch (error: any) {
    console.error("Error fetching roadmaps:", error.message);
    return [];
  }
};

export const getRoadmapById = async (id: string): Promise<UserRoadmap | null> => {
  try {
    const { data, error } = await supabase
      .from("roadmaps")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as unknown as UserRoadmap;
  } catch (error: any) {
    console.error("Error fetching roadmap:", error.message);
    return null;
  }
};

export const deleteRoadmap = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("roadmaps")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error("Error deleting roadmap:", error.message);
    return false;
  }
};
