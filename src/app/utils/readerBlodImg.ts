
import { ImagenFuntionsService } from '../services/imagen-funtions.service';

export class ImageLoader {
  constructor(private imagenFuntionsService$: ImagenFuntionsService) {}

  public loadImage(nameImg: string, adminConsul: boolean, callback: (imageUrl: string) => void) {
    this.imagenFuntionsService$[adminConsul ? "getAdminImg" : "getImg"](nameImg).subscribe((response: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        callback(imageUrl);
      };
      reader.readAsDataURL(response);
    });
  }
}
