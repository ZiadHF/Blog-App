import { format } from "date-fns";

/**
 * Generates a random author name based on the post ID.
 * @param id - The ID of the post to generate an author for.
 * @returns A string representing the author's name based on the post ID.
 */
export function generateAuthor(id : number) : string {
    const authors = [
        "Ziad Hesham",
        "John Doe",
        "Jane Smith",
        "Alice Johnson",
        "Bob Brown",
        "Charlie Davis",
        "Diana Prince",
        "Olivia Rhye",
        "Phoenix Baker",
        "Lana Steiner",
        "Alec Whitten",
    ]
    return authors[id % authors.length];
}

/**
 *  Generates a formatted date string based on the post ID.
 * @param postId - The ID of the post to generate a date for.
 * @returns  A formatted date string in the format "dd MMM yyyy".
 */
export function generateDate(postId : number) : string{
    const date = new Date();
    date.setDate(date.getDate() - postId);
    return format(date, "dd MMM yyyy");
}

/**
 *  Generates an array of tags based on the post ID.
 * @param postId - The ID of the post to generate tags for.
 * @returns An array of tags, with a minimum of one tag.
 */
export function generateTags(postId : number) : string[]{
    const tags = [
        "Design",
        "Development",
        "Research",
        "Interface",
        "User Experience",
    ]
    return tags.slice(0, postId % (tags.length + 1)).length > 0 ? tags.slice(0, postId % (tags.length + 1)) : ["General"];
}

/**
 * Generates a color class for a tag based on its index.
 * @param index - The index of the tag to generate a color for.
 * @returns A string representing the color class for the tag.
 */
export function generateTagColor(index : number) : string {
    const colors = [
        "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900",
        "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900",
        "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
        "bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900",
    ];
    return colors[index % colors.length];
}

/**
 * Truncates a given text to a specified maximum length, appending "..." if the text exceeds that length.
 * @param text - The text to truncate.
 * @param maxLength  - The maximum length of the text.
 * @returns  A truncated version of the text if it exceeds the maximum length, otherwise returns the original text.
 */
export function truncateText(text : string, maxLength : number) : string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + "...";
}

/**
 * Checks if a given URL is likely to be an image based on its file extension.
 * @param url - The URL to check if it is an image.
 * @returns A boolean indicating whether the URL is likely to be an image based on its file extension.
 */
export const isImageFastCheck = (url: string) : Boolean => {
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
};

/**
 * Checks if a given URL is an image by making a GET request and checking the response's content type.
 * @param url - The URL to check if it is an image by making a GET request.
 * @returns A promise that resolves to a boolean indicating whether the URL is an image based on the response's content type.
 */
export const isImageByGetRequest = async (url: string): Promise<boolean> => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "image/*",
      },
    });

    const contentType = res.headers.get("content-type");
    return contentType?.startsWith("image/") ?? false;
  } catch (err) {
    console.error("Image check failed:", err);
    return false;
  }
};

/**
 * Checks if a given URL is an image, either by a fast check of the file extension or by making a GET request to verify the content type.
 * @param url - The URL to check if it is an image.
 * @returns A promise that resolves to a boolean indicating whether the URL is an image, either by fast check or by making a GET request.
 */
export const isImageUrl = async (url: string): Promise<boolean> => {
  if (isImageFastCheck(url)) return true;
  return await isImageByGetRequest(url);
};
