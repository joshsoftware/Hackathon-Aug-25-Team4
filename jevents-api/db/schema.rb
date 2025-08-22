# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_08_22_204110) do
  create_table "coupons", force: :cascade do |t|
    t.integer "event_id", null: false
    t.integer "user_id", null: false
    t.string "code", null: false
    t.decimal "discount_value", null: false
    t.string "discount_type", null: false
    t.integer "usage_limit"
    t.integer "used_count", default: 0
    t.datetime "valid_from"
    t.datetime "valid_until"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id", "code"], name: "index_coupons_on_event_id_and_code", unique: true
    t.index ["event_id"], name: "index_coupons_on_event_id"
    t.index ["user_id"], name: "index_coupons_on_user_id"
  end

  create_table "event_organizers", force: :cascade do |t|
    t.integer "event_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_event_organizers_on_event_id"
    t.index ["user_id"], name: "index_event_organizers_on_user_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "location"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer "capacity"
    t.integer "status", default: 0
    t.integer "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tickets", force: :cascade do |t|
    t.string "name"
    t.integer "event_id", null: false
    t.integer "user_id", null: false
    t.decimal "price"
    t.integer "status"
    t.datetime "opening_start"
    t.datetime "opening_end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_tickets_on_event_id"
    t.index ["user_id"], name: "index_tickets_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "name"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email"
  end

  add_foreign_key "coupons", "events"
  add_foreign_key "coupons", "users"
  add_foreign_key "event_organizers", "events"
  add_foreign_key "event_organizers", "users"
  add_foreign_key "tickets", "events"
  add_foreign_key "tickets", "users"
end
