interface CategoryProps {
   id: number;
   name: string;
   slug: string;
   parent: number;
   description: string;
   image: string;
}

export class Category {
   id: number;
   name: string;
   slug: string;
   parent: number;
   description: string;
   image: string;

   constructor({ id, name, slug, parent, description, image }: CategoryProps) {
      this.id = id;
      this.name = name;
      this.slug = slug;
      this.parent = parent;
      this.description = description;
      this.image = image;
   }

   get url(): string {
      return `/products/categories/${this.slug}/${this.id}`;
   }
}
