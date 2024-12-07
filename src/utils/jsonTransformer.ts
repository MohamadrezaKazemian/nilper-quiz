type TranslationMap = { [key: string]: string };

const keyTranslation: TranslationMap = {
  مدل: "model",
  لینک: "link",
  "ارتفاع حداقل  سراسری": "min_overall_height",
  "ارتفاع حداکثری  سراسری": "max_overall_height",
  "عرض سراسری": "overall_width",
  "عمق سراسری": "overall_depth",
  "مدت زمان استفاده": "usage_duration",
  مکانیزم: "mechanism",
  "تنظیم پشتی-نشیمن": "seat_back_adjustment",
  "تنظیم عمق نشیمن": "seat_depth_adjustment",
  "تنظیم زاویه نشیمن": "seat_angle_adjustment",
  "چرخش نشیمن": "seat_rotation",
  "جنس پشتی": "back_material",
  "تنفسی بودن روکش": "breathable_cover",
  هدرست: "headrest",
  لامبرساپورت: "lumbar_support",
  "تنظیم مجزا زاویه پشتی": "back_angle_adjustment",
  "تنظیم زاویه پشتی همراه با نشیمن": "seat_back_angle_adjustment",
  "پشتیبانی گردن": "neck_support",
  "پشتیبانی گودی کمر": "lumbar_curve_support",
  "تنظیم دسته": "armrest_adjustment",
  "تنظیم ارتفاع پشتی": "back_height_adjustment",
  دسته: "armrest_type",
  "پنج پر": "five_star_base_material",
  قد: "height_requirement",
  سن: "age_requirement",
  وزن: "weight_range",
  "نوع میز": "table_type",
  "کلاس ابعادی": "dimensional_class",
  "عادت نشستن A": "sitting_habit_A",
  "عادت نشستن B": "sitting_habit_B",
  "عادت نشستن C": "sitting_habit_C",
  "عادت نشستن D": "sitting_habit_D",
  "عادت نشستن E": "sitting_habit_E",
  "عادت نشستن F": "sitting_habit_F",
  "عادت نشستن G": "sitting_habit_G",
  "عادت نشستن H": "sitting_habit_H",
  "عادت نشستن I": "sitting_habit_I",
  "عادت نشستن K": "sitting_habit_K",
  "وزن محصول  ": "product_weight",
  "ارتفاع حداقل  نشیمن": "min_seat_height",
  "ارتفاع حداکثر  نشیمن": "max_seat_height",
  "عرض نشیمن": "seat_width",
  "عمق نشیمن": "seat_depth",
  "مساحت نشیمن": "seat_area",
  "ارتفاع پشتی": "back_height",
  "عرض خارج به خارج دسته": "outer_armrest_width",
  "عرض داخل به داخل": "inner_armrest_width",
  "طول دسته": "armrest_length",
  پهنا: "armrest_width",
};

const valueTranslation: TranslationMap = {
  "بین 2 تا 8 ساعت": "2 to 8 hours",
  "نیازی نیست": "not needed",
  ندارد: "no",
  نامحدود: "unlimited",
  چرم: "leather",
  پارچه: "fabric",
  مش: "mesh",
  دارد: "yes",
  ثابت: "fixed",
  متحرک: "adjustable",
  پلاستیکی: "plastic",
  فلزی: "metal",
  "داشته باشد": "needed",
  "پلاستیکی - فلزی": "plastic-metal",
  "زیر 14 سال": "below 14 years old",
  "بالای 14 سال": "above 14 years old",
  "بین 50 تا 120 کیلوگرم": "50 to 120 kg",
  "زیر 50 کیلوگرم": "below 50 kg",
  "بیشتر از 160": "above 160 cm",
  "زیر 75 سانتی متر": "below 75 cm",
  "چرم \nپارچه": "leatherFab",
  "بالای 75 سانتی متر": "above 75 cm",
  بزرگ: "large",
  متوسط: "medium",
  تیلت: "Tilt",
  کوچک: "small",
  "زیر 160": "below 160 cm",
  "زیر 2 ساعت": "less than 2 hours",
};

export function transformJson(data: any): any {
  const translateKeys = (obj: any): any => {
    if (typeof obj === "object" && !Array.isArray(obj)) {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        const translatedKey = keyTranslation[key.trim()] || key;
        acc[translatedKey] = translateKeys(value);
        return acc;
      }, {} as any);
    } else if (Array.isArray(obj)) {
      return obj.map(translateKeys);
    } else if (typeof obj === "string") {
      return valueTranslation[obj.trim()] || obj.trim();
    }
    return obj;
  };

  return translateKeys(data);
}
