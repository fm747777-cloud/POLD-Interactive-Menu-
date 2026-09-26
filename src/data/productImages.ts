import baconAddonImg from '../assets/images/bacon_addon_transparent.png';
import baconBurgerImg from '../assets/images/bacon_burger_transparent.png';
import bbqSauceImg from '../assets/images/bbq_sauce_transparent.png';
import beefFriesImg from '../assets/images/beef_fries_transparent.png';
import bigTastySauceImg from '../assets/images/big_tasty_sauce_transparent.png';
import bulkBurgerImg from '../assets/images/bulk_burger_transparent.png';
import cheddarSauceImg from '../assets/images/cheddar_sauce_transparent.png';
import cheeseCheetosImg from '../assets/images/cheese_cheetos_transparent.png';
import cheeseFriesImg from '../assets/images/cheese_fries_transparent.png';
import cheetosAddonImg from '../assets/images/cheetos_addon_transparent.png';
import chickenFireImg from '../assets/images/chicken_fire_transparent.png';
import chickenFriesImg from '../assets/images/chicken_fries_transparent.png';
import chickenRanchImg from '../assets/images/chicken_ranch_transparent.png';
import classicBurgerImg from '../assets/images/classic_burger_transparent.png';
import coleslawAddonImg from '../assets/images/coleslaw_addon_transparent.png';
import creamyMushroomBeefImg from '../assets/images/creamy_mushroom_beef_transparent.png';
import crispoChickenImg from '../assets/images/crispo_chicken_transparent.png';
import doritoChickenImg from '../assets/images/dorito_chicken_transparent.png';
import doritosAddonImg from '../assets/images/doritos_addon_transparent.png';
import extraFriesImg from '../assets/images/extra_fries_transparent.png';
import fireSauceImg from '../assets/images/fire_sauce_transparent.png';
import fireSlowPoldImg from '../assets/images/fire_slow_pold_transparent.png';
import hulkBurgerImg from '../assets/images/hulk_burger_transparent.png';
import jaguarImg from '../assets/images/jaguar_transparent.png';
import masterKingImg from '../assets/images/master_king_transparent.png';
import mixFriesImg from '../assets/images/mix_fries_transparent.png';
import mixPoldImg from '../assets/images/mix_pold_transparent.png';
import mozzarellaSticksImg from '../assets/images/mozzarella_sticks_transparent.png';
import mushroomAddonImg from '../assets/images/mushroom_addon_transparent.png';
import onionRingsImg from '../assets/images/onion_rings_transparent.png';
import originalImg from '../assets/images/original_transparent.png';
import poldBurgerImg from '../assets/images/pold_burger_transparent.png';
import ranchSauceImg from '../assets/images/ranch_sauce_transparent.png';
import rikishiChickenImg from '../assets/images/rikishi_chicken_transparent.png';
import samuraiSauceImg from '../assets/images/samurai_sauce_transparent.png';
import slowPoldImg from '../assets/images/slow_pold_transparent.png';
import smokedBeefAddonImg from '../assets/images/smoked_beef_addon_transparent.png';
import smokedLoversImg from '../assets/images/smoked_lovers_transparent.png';
import smokedTurkeyAddonImg from '../assets/images/smoked_turkey_addon_transparent.png';
import sweetChiliSauceImg from '../assets/images/sweet_chili_sauce_transparent.png';
import sweetyBeefPoldImg from '../assets/images/sweety_beef_pold_transparent.png';
import sweetyChickenBoldImg from '../assets/images/sweety_chicken_bold_transparent.png';
import thousandIslandSauceImg from '../assets/images/thousand_island_sauce_transparent.png';

/**
 * Exact 1-to-1 product image mapping using the uploaded product image filename
 * as the sole source of truth for the product identifier.
 * Every image is a true transparent PNG (alpha transparency, no background).
 */
export const PRODUCT_IMAGES_BY_ID: Record<string, string> = {
  // Burgers (10 items)
  'bacon-burger': baconBurgerImg,
  'buik-burger': bulkBurgerImg,
  'classic-burger': classicBurgerImg,
  'creamy-mushroom-beef': creamyMushroomBeefImg,
  'huik-burger': hulkBurgerImg,
  'jaguar': jaguarImg,
  'mix-pold': mixPoldImg,
  'original': originalImg,
  'pold-burger': poldBurgerImg,
  'sweety-beef-pold': sweetyBeefPoldImg,

  // Chicken (11 items)
  'cheese-cheetos': cheeseCheetosImg,
  'chicken-fire': chickenFireImg,
  'chicken-ranch': chickenRanchImg,
  'crispo-chicken': crispoChickenImg,
  'dorito-chicken': doritoChickenImg,
  'fire-slow-pold': fireSlowPoldImg,
  'master-king': masterKingImg,
  'rikishi-chicken': rikishiChickenImg,
  'slow-pold': slowPoldImg,
  'smoked-lovers': smokedLoversImg,
  'sweety-chicken-bold': sweetyChickenBoldImg,

  // Fries (4 items)
  'cheese-fries': cheeseFriesImg,
  'chicken-fries': chickenFriesImg,
  'beef-fries': beefFriesImg,
  'mix-fries': mixFriesImg,

  // Sauces (8 items)
  'sauce-ranch': ranchSauceImg,
  'sauce-big-tasty': bigTastySauceImg,
  'sauce-cheddar': cheddarSauceImg,
  'sauce-thousand-island': thousandIslandSauceImg,
  'sauce-samurai': samuraiSauceImg,
  'sauce-bbq': bbqSauceImg,
  'sauce-fire': fireSauceImg,
  'sauce-sweet-chili': sweetChiliSauceImg,

  // Add-ons / Extras (10 items)
  'addon-smoked-turkey': smokedTurkeyAddonImg,
  'addon-smoked-beef': smokedBeefAddonImg,
  'addon-mushroom': mushroomAddonImg,
  'addon-bacon': baconAddonImg,
  'addon-coleslaw': coleslawAddonImg,
  'addon-mozzarella-sticks': mozzarellaSticksImg,
  'addon-onion-rings': onionRingsImg,
  'addon-fries': extraFriesImg,
  'addon-cheetos': cheetosAddonImg,
  'addon-doritos': doritosAddonImg,
};

export const PRODUCT_IMAGES_BY_NAME: Record<string, string> = {
  // Burgers (10 items)
  'BACON BURGER': baconBurgerImg,
  'BULK BURGER': bulkBurgerImg,
  'BUIK BURGER': bulkBurgerImg,
  'CLASSIC BURGER': classicBurgerImg,
  'CREAMY MUSHROOM BEEF': creamyMushroomBeefImg,
  'HULK BURGER': hulkBurgerImg,
  'HUIK BURGER': hulkBurgerImg,
  'JAGUAR': jaguarImg,
  'MIX POLD': mixPoldImg,
  'ORIGINAL': originalImg,
  'POLD BURGER': poldBurgerImg,
  'SWEETY BEEF POLD': sweetyBeefPoldImg,

  // Chicken (11 items)
  'CHEESE CHEETOS': cheeseCheetosImg,
  'CHICKEN FIRE': chickenFireImg,
  'CHICKEN RANCH': chickenRanchImg,
  'CRISPO CHICKEN': crispoChickenImg,
  'DORITO CHICKEN': doritoChickenImg,
  'FIRE SLOW POLD': fireSlowPoldImg,
  'MASTER KING': masterKingImg,
  'RIKISHI CHICKEN': rikishiChickenImg,
  'SLOW POLD': slowPoldImg,
  'SMOKED LOVERS': smokedLoversImg,
  'SWEETY CHICKEN BOLD': sweetyChickenBoldImg,

  // Fries (4 items — including exact uploaded filenames)
  'CHEESE FRIES': cheeseFriesImg,
  'CHEESE FRIZE': cheeseFriesImg,
  'CHICKEN FRIES': chickenFriesImg,
  'CHICKEN FRISE': chickenFriesImg,
  'BEEF FRIES': beefFriesImg,
  'MIX FRIES': mixFriesImg,
  'MIX FRISE': mixFriesImg,

  // Sauces (8 items — including exact uploaded filenames)
  'Ranch_sauce': ranchSauceImg,
  'RANCH SAUCE': ranchSauceImg,
  'RANCH': ranchSauceImg,
  'رانش': ranchSauceImg,
  'Big Tasty Sauce': bigTastySauceImg,
  'BIG TASTY SAUCE': bigTastySauceImg,
  'BIG TASTY': bigTastySauceImg,
  'بيج تيستي': bigTastySauceImg,
  'Cheddar Sauce': cheddarSauceImg,
  'CHEDDAR SAUCE': cheddarSauceImg,
  'CHEDDAR': cheddarSauceImg,
  'شيدر': cheddarSauceImg,
  'Thousand Island Sauce': thousandIslandSauceImg,
  'THOUSAND ISLAND SAUCE': thousandIslandSauceImg,
  'THOUSAND ISLAND': thousandIslandSauceImg,
  'الف جزيره': thousandIslandSauceImg,
  'Samurai Sauce': samuraiSauceImg,
  'SAMURAI SAUCE': samuraiSauceImg,
  'SAMURAI': samuraiSauceImg,
  'ساموراي': samuraiSauceImg,
  'BBQ Sauce': bbqSauceImg,
  'BBQ SAUCE': bbqSauceImg,
  'BBQ': bbqSauceImg,
  'باربكيو': bbqSauceImg,
  'Fire Sauce': fireSauceImg,
  'FIRE SAUCE': fireSauceImg,
  'FIRE': fireSauceImg,
  'فاير': fireSauceImg,
  'Sweet Chili Sauce': sweetChiliSauceImg,
  'SWEET CHILI SAUCE': sweetChiliSauceImg,
  'SWEET CHILI': sweetChiliSauceImg,
  'سويت شيلي': sweetChiliSauceImg,

  // Add-ons / Extras (10 items — including exact uploaded Arabic filenames)
  'شريحة تركي مدخن': smokedTurkeyAddonImg,
  'SMOKED TURKEY SLICE': smokedTurkeyAddonImg,
  'شريحة بيف مدخن': smokedBeefAddonImg,
  'شرية بيف مدخنه': smokedBeefAddonImg,
  'SMOKED BEEF SLICE': smokedBeefAddonImg,
  'مشروم': mushroomAddonImg,
  'MUSHROOMS': mushroomAddonImg,
  'بيكون': baconAddonImg,
  'BACON': baconAddonImg,
  'كلوسلو': coleslawAddonImg,
  'COLESLAW': coleslawAddonImg,
  '2 اصابع موزاريلا': mozzarellaSticksImg,
  '2اصابع موزاريلا': mozzarellaSticksImg,
  '2 MOZZARELLA STICKS': mozzarellaSticksImg,
  '2 حلقات بصل': onionRingsImg,
  '2حلقات بصل': onionRingsImg,
  '2 ONION RINGS': onionRingsImg,
  'اضافة بطاطس': extraFriesImg,
  'EXTRA FRIES': extraFriesImg,
  'شيتوس': cheetosAddonImg,
  'CHEETOS': cheetosAddonImg,
  'دوريتوس': doritosAddonImg,
  'DORITOS': doritosAddonImg,
};
